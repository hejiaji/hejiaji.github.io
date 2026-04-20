/* ─────────────────────────────────────────────────────────────
   2026 Goals — GitHub Gist sync (private gist)
   ─────────────────────────────────────────────────────────────

   ⚠️⚠️⚠️  SECURITY WARNING — READ THIS FIRST  ⚠️⚠️⚠️
   ─────────────────────────────────────────────────────────────
   This file contains an embedded GitHub Personal Access Token.
   When this site is deployed to hejiaji.cn (a public site), the
   token below WILL be readable by anyone who views the page
   source. GitHub's secret scanner will likely also detect it.

   Risk assumptions for accepting this trade-off:
     • The token is a FINE-GRAINED PAT scoped ONLY to
       "Gists: Read & Write" — worst-case damage is limited
       to your gists (read/edit/delete/create).
     • The token has an EXPIRATION date set.
     • You have a plan to ROTATE it if (when) it leaks.
     • You accept that the "private" gist content is, by extension,
       accessible to anyone who finds the token.

   To rotate after a leak:
     1. Revoke at https://github.com/settings/personal-access-tokens
     2. Generate a new fine-grained PAT (Gists R/W only, expiry set)
     3. Replace EMBEDDED_TOKEN below
     4. Commit + push

   Exposes window.GoalsSync with:
     - getConfig()           → { token, gistId } | null
     - pull()                → returns parsed JSON payload (or null if empty)
     - push(payload)         → uploads payload (writes lastUpdated)
     - onStatus(fn)          → status events
*/

// ⚠️ EDIT THESE THREE VALUES ─ paste your token + gist ID + push password. Then commit.
// PUSH_PASSWORD acts as a friction guard so casual visitors can't accidentally
// (or maliciously) overwrite your gist by clicking Push. It is NOT real security
// — anyone reading source can see it. Use a memorable but non-trivial string.
const EMBEDDED_TOKEN   = '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';
const EMBEDDED_GIST_ID = '0dee662e56da5b3a0cfa560730426faa';
const PUSH_PASSWORD    = 'hejiaji';

const GIST_FILENAME = 'goals-2026.json';
const GIST_DESC     = 'Jeremy He — 2026 goal tracker (private)';

const listeners = new Set();
function emit(status, detail) {
    listeners.forEach(fn => {
        try { fn({ status, detail, ts: Date.now() }); } catch {}
    });
}

function isPlaceholder(v) {
    return !v || v === 'PASTE_YOUR_TOKEN_HERE' || v === 'PASTE_YOUR_GIST_ID_HERE' || v === 'PASTE_YOUR_PUSH_PASSWORD_HERE';
}

/** Returns the embedded creds, or null if placeholders haven't been replaced. */
function getConfig() {
    if (isPlaceholder(EMBEDDED_TOKEN) || isPlaceholder(EMBEDDED_GIST_ID)) return null;
    return { token: EMBEDDED_TOKEN, gistId: EMBEDDED_GIST_ID };
}

/** Compare an entered password against the embedded one (case-sensitive). */
function verifyPushPassword(entered) {
    if (isPlaceholder(PUSH_PASSWORD)) return false;
    return entered === PUSH_PASSWORD;
}

async function gh(path, options = {}) {
    const cfg = getConfig();
    if (!cfg) throw new Error('Sync not configured (placeholders not replaced in sync.js)');
    const res = await fetch(`https://api.github.com${path}`, {
        ...options,
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${cfg.token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(options.headers || {})
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        const err = new Error(`GitHub ${res.status}: ${text || res.statusText}`);
        err.status = res.status;
        throw err;
    }
    return res.status === 204 ? null : res.json();
}

/** Pull the current payload from the gist, or null if file missing. */
async function pull() {
    const cfg = getConfig();
    if (!cfg) throw new Error('Sync not configured');
    emit('pulling');
    const gist = await gh(`/gists/${cfg.gistId}`);
    const file = gist.files && gist.files[GIST_FILENAME];
    if (!file) {
        emit('pulled', { empty: true });
        return null;
    }
    let content = file.content;
    if (file.truncated && file.raw_url) {
        const raw = await fetch(file.raw_url, {
            headers: { 'Authorization': `Bearer ${cfg.token}` }
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
    const cfg = getConfig();
    if (!cfg) throw new Error('Sync not configured');
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
    await gh(`/gists/${cfg.gistId}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });
    emit('pushed', { ts: Date.now() });
}

function onStatus(fn) { listeners.add(fn); return () => listeners.delete(fn); }

window.GoalsSync = {
    getConfig, verifyPushPassword, pull, push, onStatus,
    GIST_FILENAME
};
