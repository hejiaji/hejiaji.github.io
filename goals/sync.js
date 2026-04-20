/* ─────────────────────────────────────────────────────────────
   2026 Goals — GitHub Gist sync (encrypted token)
   ─────────────────────────────────────────────────────────────

   The GitHub Personal Access Token is stored here as an
   AES-GCM-encrypted blob. The decryption password is NEVER
   committed and must be entered by the user at page load.

   To create / rotate the token:
     1. Open `goals/encrypt-token.html` locally in your browser
     2. Paste a fresh fine-grained PAT (Gists R/W) + chosen password
     3. Click Encrypt → copy the Base64 blob
     4. Replace ENCRYPTED_TOKEN below
     5. Commit + push (NOT detected by GitHub secret scanner)

   Crypto: PBKDF2-SHA256 (210,000 iters) → AES-GCM-256
   Encoded blob layout: [16-byte salt][12-byte IV][ciphertext+tag], Base64.

   Exposes window.GoalsSync:
     - hasEncryptedToken()  → true if ENCRYPTED_TOKEN looks real
     - unlock(password)     → decrypt + cache token in memory; throws if wrong
     - lock()               → wipe cached token from memory + sessionStorage
     - isUnlocked()         → bool
     - getGistId()          → string
     - pull()               → returns parsed JSON payload (or null if empty)
     - push(payload)        → uploads payload (writes lastUpdated)
     - onStatus(fn)         → status events
*/

// ⚠️ Replace with the Base64 output from goals/encrypt-token.html
const ENCRYPTED_TOKEN  = 'y20f6pEYqejwkjL/sKa5mwK+d14nk9yt4wDiM4vXaPerlPJF9zlvGKcNXjmtvHTcoIltsR7zkNmzAub+DRYxeaZZuEu5ywIhExex8VW/KI/fDGAZT0HOdO+SFtt+R2w4iuJchYHgfVNVrUM6aube296As05+av0fa0ySaFumDh2oIn1YWp8bLd0=';
const EMBEDDED_GIST_ID = '0dee662e56da5b3a0cfa560730426faa';

const GIST_FILENAME = 'goals-2026.json';

// ── Crypto constants (must match encrypt-token.html) ──
const PBKDF2_ITER  = 210000;
const SALT_BYTES   = 16;
const IV_BYTES     = 12;
const CACHE_KEY    = 'goals-2026-token-cache';   // sessionStorage

// ── State ──
let _token = null;   // Decrypted token, kept in memory only
const listeners = new Set();

function emit(status, detail) {
    listeners.forEach(fn => {
        try { fn({ status, detail, ts: Date.now() }); } catch {}
    });
}

function isPlaceholder() {
    return !ENCRYPTED_TOKEN || ENCRYPTED_TOKEN === 'PASTE_ENCRYPTED_BASE64_HERE';
}
function hasEncryptedToken() { return !isPlaceholder(); }
function getGistId() { return EMBEDDED_GIST_ID; }

// ── Crypto helpers ──
function b64dec(s) {
    const bin = atob(s);
    const u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u;
}
async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
        'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: PBKDF2_ITER, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Decrypt the embedded ENCRYPTED_TOKEN with `password`.
 * Resolves to the plaintext token on success; rejects on wrong password
 * or corrupted blob (AES-GCM provides authenticated decryption).
 */
async function decryptToken(password) {
    if (!hasEncryptedToken()) throw new Error('No encrypted token configured');
    const packed = b64dec(ENCRYPTED_TOKEN);
    if (packed.length < SALT_BYTES + IV_BYTES + 16) {
        throw new Error('Encrypted blob too short');
    }
    const salt = packed.slice(0, SALT_BYTES);
    const iv   = packed.slice(SALT_BYTES, SALT_BYTES + IV_BYTES);
    const ct   = packed.slice(SALT_BYTES + IV_BYTES);
    const key  = await deriveKey(password, salt);
    const pt   = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return new TextDecoder().decode(pt);
}

/** Unlock by entering the password. Caches token in memory + sessionStorage. */
async function unlock(password) {
    const token = await decryptToken(password); // throws if wrong
    _token = token;
    try { sessionStorage.setItem(CACHE_KEY, token); } catch {}
    emit('unlocked');
    return true;
}

/** Try to recover an already-unlocked session from sessionStorage. */
function tryRestoreSession() {
    if (_token) return true;
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached && typeof cached === 'string' && cached.length > 10) {
            _token = cached;
            return true;
        }
    } catch {}
    return false;
}

/** Wipe the decrypted token from memory and sessionStorage. */
function lock() {
    _token = null;
    try { sessionStorage.removeItem(CACHE_KEY); } catch {}
    emit('locked');
}

function isUnlocked() { return !!_token; }

// ── GitHub helpers ──
async function gh(path, options = {}) {
    if (!_token) throw new Error('Locked — call unlock(password) first');
    const res = await fetch(`https://api.github.com${path}`, {
        ...options,
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${_token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(options.headers || {})
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        const err = new Error(`GitHub ${res.status}: ${text || res.statusText}`);
        err.status = res.status;
        // 401 → token is invalid; lock so the user re-prompts
        if (res.status === 401) lock();
        throw err;
    }
    return res.status === 204 ? null : res.json();
}

/** Pull the current payload from the gist, or null if file missing. */
async function pull() {
    if (!_token) throw new Error('Locked');
    emit('pulling');
    const gist = await gh(`/gists/${EMBEDDED_GIST_ID}`);
    const file = gist.files && gist.files[GIST_FILENAME];
    if (!file) {
        emit('pulled', { empty: true });
        return null;
    }
    let content = file.content;
    if (file.truncated && file.raw_url) {
        const raw = await fetch(file.raw_url, {
            headers: { 'Authorization': `Bearer ${_token}` }
        });
        content = await raw.text();
    }
    let parsed = null;
    try { parsed = JSON.parse(content); } catch { parsed = null; }
    emit('pulled', { ok: true, lastUpdated: parsed && parsed.lastUpdated });
    return parsed;
}

/** Push the payload to the gist (sets lastUpdated automatically). */
async function push(payload) {
    if (!_token) throw new Error('Locked');
    emit('pushing');
    const body = {
        files: {
            [GIST_FILENAME]: {
                content: JSON.stringify({
                    version: 2,
                    lastUpdated: new Date().toISOString(),
                    ...payload
                }, null, 2)
            }
        }
    };
    await gh(`/gists/${EMBEDDED_GIST_ID}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });
    emit('pushed', { ts: Date.now() });
}

function onStatus(fn) { listeners.add(fn); return () => listeners.delete(fn); }

// Try to restore unlocked state on script load
tryRestoreSession();

window.GoalsSync = {
    hasEncryptedToken, unlock, lock, isUnlocked, getGistId,
    pull, push, onStatus,
    GIST_FILENAME
};
