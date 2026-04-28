/* ─────────────────────────────────────────────
   2026 Goals — interactive trackers
   ───────────────────────────────────────────── */

const STORAGE_KEY = 'goals-2026-v2';
const BOOK_TARGET = 10;
const WEIGHT_TARGET = 75; // kg
const GYM_WEEKLY_TARGET = 3;
// First ISO week (in 2026) for which the gym goal is trackable.
// Weeks before this are marked N/A in the heatmap (the app didn't exist yet).
const GYM_TRACKING_START_WEEK = 17; // 2026-04-20 (Mon) – 2026-04-26 (Sun)

/* ───── Translations ───── */
const T = {
    en: {
        booksTitle: 'Read 10 books',
        booksNotes: 'About one per month.',
        booksRead: 'read',
        booksOf: 'of',
        booksRemaining: 'to go',
        booksPlaceholder: 'Book title…',
        booksEmpty: 'Book #{n} — not read yet',
        booksHint: 'Click a book to add or edit a title · right-click to clear',
        booksPromptLabel: 'Title for book #{n} (leave blank to clear):',
        weightTitle: 'Stay under 75 kg',
        weightNotes: 'Weigh in weekly to track the trend.',
        weightCurrent: 'Current',
        weightUnder: 'Under target',
        weightOver: 'Over target',
        weightDone: 'On target',
        gymTitle: 'Gym 3× per week',
        gymNotes: 'Strength + mobility, no excuses. Click a week to log sessions.',
        gymWeek: 'Week',
        gymHit: 'on-target weeks',
        gymStreak: '🔥 streak',
        gymLegendLess: 'Fewer',
        gymLegendMore: 'More',
        gymNA:        'N/A (before tracking started)',
        gymCurrent:   'this week',
        gymSessions:  'sessions',
        gymTracked:   'tracked weeks',
        confirmReset: 'Reset all 2026 goal progress?',
        yearDays: 'days'
    },
    zh: {
        booksTitle: '阅读 10 本书',
        booksNotes: '大约每月一本，技术与非虚构搭配。',
        booksRead: '已读',
        booksOf: '共',
        booksRemaining: '本待读',
        booksPlaceholder: '书名…',
        booksEmpty: '第 {n} 本 · 尚未阅读',
        booksHint: '点击书籍添加或编辑书名 · 右键点击可清除',
        booksPromptLabel: '第 {n} 本书的书名（留空即清除）：',
        weightTitle: '保持体重 75 公斤以下',
        weightNotes: '每周称重，关注趋势。',
        weightCurrent: '当前',
        weightUnder: '低于目标',
        weightOver: '高于目标',
        weightDone: '达标',
        gymTitle: '每周健身 3 次',
        gymNotes: '力量加柔韧，不找借口。点击某一周记录次数。',
        gymWeek: '第',
        gymHit: '达标周',
        gymStreak: '🔥 连胜',
        gymLegendLess: '少',
        gymLegendMore: '多',
        gymNA:        '未开始追踪',
        gymCurrent:   '本周',
        gymSessions:  '次',
        gymTracked:   '已追踪周',
        confirmReset: '确定要重置全部 2026 年目标进度吗？',
        yearDays: '天'
    }
};

/* ───── State ───── */
function loadState() {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        return {
            books: Array.isArray(raw.books) ? raw.books : Array(BOOK_TARGET).fill(''),
            weight: typeof raw.weight === 'number' ? raw.weight : null,
            gym: Array.isArray(raw.gym) && raw.gym.length === 53 ? raw.gym : Array(53).fill(0),
            lastUpdated: typeof raw.lastUpdated === 'string' ? raw.lastUpdated : null
        };
    } catch {
        return { books: Array(BOOK_TARGET).fill(''), weight: null, gym: Array(53).fill(0), lastUpdated: null };
    }
}
function saveState() {
    // Bump local timestamp on every save so push knows "this is newer"
    state.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
let lang = localStorage.getItem('lang') || 'en';

/* ───── Helpers ───── */
function t(key) { return T[lang][key]; }

function isoWeekOf(date) {
    // ISO 8601 week number (1..53), week starts Monday
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/** Returns { start, end } Date objects for the Monday→Sunday range of an ISO week in `year`. */
function isoWeekDateRange(year, week) {
    // Jan 4 is always in ISO week 1
    const jan4 = new Date(year, 0, 4);
    const jan4Day = jan4.getDay() || 7; // 1..7 (Mon..Sun)
    const week1Monday = new Date(year, 0, 4 - (jan4Day - 1));
    const start = new Date(week1Monday);
    start.setDate(week1Monday.getDate() + (week - 1) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
}

function fmtDateRange(year, week, lang) {
    const { start, end } = isoWeekDateRange(year, week);
    if (lang === 'zh') {
        const fm = d => `${d.getMonth() + 1}月${d.getDate()}日`;
        return `${fm(start)} – ${fm(end)}`;
    }
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const fm = d => `${months[d.getMonth()]} ${d.getDate()}`;
    return `${fm(start)} – ${fm(end)}`;
}

function totalIsoWeeksIn(year) {
    // A year has 53 ISO weeks if Jan 1 is Thursday, or it's a leap year and Jan 1 is Wednesday.
    const jan1 = new Date(year, 0, 1).getDay(); // 0=Sun
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return (jan1 === 4 || (isLeap && jan1 === 3)) ? 53 : 52;
}

const TOTAL_WEEKS_2026 = totalIsoWeeksIn(2026); // 53

/* ───── Icons ───── */
const ICON_BOOK  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const ICON_SCALE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3"/><path d="M5 7h14l-2 13H7L5 7z"/><path d="M9 12l3-3 3 3"/></svg>`;
const ICON_GYM   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6v12"/><path d="M18 6v12"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/></svg>`;

/* ───── Render: page ───── */
function renderAll() {
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute('data-' + lang);
    });
    document.getElementById('langLabel').textContent = lang === 'en' ? '中文' : 'EN';

    renderYear();
    renderGoals();
    renderRing();
}

/* ───── Year overview ───── */
function renderYear() {
    const now = new Date();
    const start = new Date(2026, 0, 1);
    const end = new Date(2027, 0, 1);
    const total = end - start;
    const elapsed = Math.max(0, Math.min(total, now - start));
    const pct = Math.round((elapsed / total) * 100);
    const dayOfYear = Math.min(Math.floor(elapsed / 86400000) + 1, Math.round(total / 86400000));
    const totalDays = Math.round(total / 86400000);
    document.getElementById('yearPct').textContent = pct;
    document.getElementById('dayOfYear').textContent = dayOfYear;
    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('yearBar').style.width = pct + '%';
}

/* ───── Goal cards ───── */
function renderGoals() {
    const stack = document.getElementById('goalStack');
    stack.innerHTML = '';
    stack.appendChild(buildBookCard());
    stack.appendChild(buildWeightCard());
    stack.appendChild(buildGymCard());
}

/* ── Card 1: Books ── */
function buildBookCard() {
    const readCount = state.books.filter(b => b && b.trim()).length;
    const pct = Math.min(100, Math.round((readCount / BOOK_TARGET) * 100));
    const done = readCount >= BOOK_TARGET;
    const remaining = Math.max(0, BOOK_TARGET - readCount);

    const card = document.createElement('article');
    card.className = 'goal-card' + (done ? ' done' : '');
    card.innerHTML = `
        <div class="goal-head">
            <div class="goal-icon">${ICON_BOOK}</div>
            <div class="goal-title">${t('booksTitle')}</div>
            <div class="goal-pct">${readCount}/${BOOK_TARGET}</div>
        </div>
        <p class="goal-notes">${t('booksNotes')}</p>
        <div class="book-tracker">
            <div class="book-meta">
                <span><strong>${readCount}</strong> ${t('booksOf')} ${BOOK_TARGET} ${t('booksRead')}</span>
                <span>${remaining} ${t('booksRemaining')} · ${pct}%</span>
            </div>
            <div class="book-grid">
                ${state.books.map((b, i) => {
                    const title = (b || '').trim();
                    const labelTitle = title || t('booksEmpty').replace('{n}', i + 1);
                    return `
                        <div class="book-slot${title ? ' read' : ''}"
                             data-i="${i}"
                             tabindex="0"
                             role="button"
                             aria-label="${labelTitle.replace(/"/g,'&quot;')}">
                            <span class="book-spine-num">${String(i + 1).padStart(2, '0')}</span>
                            <span class="book-tooltip">${labelTitle.replace(/</g,'&lt;')}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <p class="book-hint">${t('booksHint')}</p>
        </div>
    `;

    // Slot interaction:
    //   • Click empty slot → prompt for title (sets read with title)
    //   • Click filled slot → prompt to edit title (empty submit clears = unread)
    //   • Right-click filled slot → quick clear
    card.querySelectorAll('.book-slot').forEach(slot => {
        const i = +slot.dataset.i;
        const promptForTitle = () => {
            const current = state.books[i] || '';
            const next = window.prompt(t('booksPromptLabel').replace('{n}', i + 1), current);
            if (next === null) return; // cancelled
            state.books[i] = next.trim();
            saveState();
            renderGoals();
            renderRing();
        };
        slot.addEventListener('click', promptForTitle);
        slot.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); promptForTitle(); }
        });
        slot.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (state.books[i]) {
                state.books[i] = '';
                saveState();
                renderGoals();
                renderRing();
            }
        });
    });
    return card;
}

/* ── Card 2: Weight ── */
function buildWeightCard() {
    const w = state.weight;
    const hasReading = typeof w === 'number' && !isNaN(w);
    const under = hasReading && w <= WEIGHT_TARGET;
    const done = under;

    // Scale: visualize 65–85 kg
    const lo = 65, hi = 85;
    const clamped = hasReading ? Math.max(lo, Math.min(hi, w)) : null;
    const markerPct = clamped !== null ? ((clamped - lo) / (hi - lo)) * 100 : null;

    const card = document.createElement('article');
    card.className = 'goal-card' + (done ? ' done' : '');
    card.innerHTML = `
        <div class="goal-head">
            <div class="goal-icon">${ICON_SCALE}</div>
            <div class="goal-title">${t('weightTitle')}</div>
            <div class="goal-pct">${hasReading ? w.toFixed(1) + ' kg' : '— kg'}</div>
        </div>
        <p class="goal-notes">${t('weightNotes')}</p>
        <div class="weight-tracker">
            <div class="weight-row">
                <label>${t('weightCurrent')}:</label>
                <input type="number" class="weight-input" id="weightInput" step="0.1" min="40" max="150"
                       value="${hasReading ? w : ''}" placeholder="—">
                <span class="weight-unit">kg</span>
                ${hasReading ? `<span class="weight-status ${under ? 'under' : 'over'}">${under ? t('weightDone') : t('weightOver')}</span>` : ''}
            </div>
            <div class="weight-scale">
                ${markerPct !== null ? `<div class="marker-now" style="left:${markerPct}%"></div>` : ''}
                <div class="marker-target"></div>
            </div>
            <div class="weight-legend">
                <span>${lo} kg</span>
                <span>${hi} kg</span>
            </div>
        </div>
    `;

    const input = card.querySelector('#weightInput');
    let debounce;
    input.addEventListener('input', e => {
        clearTimeout(debounce);
        const v = parseFloat(e.target.value);
        debounce = setTimeout(() => {
            state.weight = isNaN(v) ? null : v;
            saveState();
            renderGoals();
            renderRing();
            // Restore focus
            const newInput = document.getElementById('weightInput');
            if (newInput) {
                newInput.focus();
                newInput.setSelectionRange(newInput.value.length, newInput.value.length);
            }
        }, 350);
    });
    return card;
}

/* ── Card 3: Gym ── */
function buildGymCard() {
    const now = new Date();
    const currentWeek = now.getFullYear() === 2026
        ? isoWeekOf(now)
        : (now.getFullYear() < 2026 ? 0 : TOTAL_WEEKS_2026);

    // N/A = weeks before tracking started (the app didn't exist yet).
    // Everything from GYM_TRACKING_START_WEEK onward is trackable; weeks
    // between the start and the current week are "past trackable" history
    // you can still fill in retroactively.
    const isNA      = w => w >= 1 && w < GYM_TRACKING_START_WEEK;
    const isCurrent = w => w === currentWeek;
    const isFuture  = w => w > currentWeek;

    const hitWeeks = state.gym.filter((c, i) =>
        i >= 1 && i <= TOTAL_WEEKS_2026 && !isNA(i) && c >= GYM_WEEKLY_TARGET
    ).length;

    // Streak: consecutive on-target weeks counting back from current week.
    // Stops at the tracking start (anything earlier doesn't break it).
    let streak = 0;
    for (let w = currentWeek; w >= GYM_TRACKING_START_WEEK; w--) {
        if ((state.gym[w] || 0) >= GYM_WEEKLY_TARGET) streak++;
        else break;
    }

    const sumSessions = state.gym.reduce((s, n, i) =>
        (i >= 1 && i <= TOTAL_WEEKS_2026 && !isNA(i)) ? s + (n || 0) : s, 0);

    // Tracked weeks = everything from the tracking start to year-end.
    const trackedWeeks = Math.max(0, TOTAL_WEEKS_2026 - GYM_TRACKING_START_WEEK + 1);
    // Elapsed trackable weeks = how many of those have already occurred (incl. current).
    const elapsedTrackable = Math.max(0,
        Math.min(TOTAL_WEEKS_2026, currentWeek) - GYM_TRACKING_START_WEEK + 1);
    const hitRate = elapsedTrackable > 0
        ? Math.round((hitWeeks / elapsedTrackable) * 100)
        : 0;

    const done = hitWeeks >= trackedWeeks && trackedWeeks > 0;

    const card = document.createElement('article');
    card.className = 'goal-card' + (done ? ' done' : '');
    card.innerHTML = `
        <div class="goal-head">
            <div class="goal-icon">${ICON_GYM}</div>
            <div class="goal-title">${t('gymTitle')}</div>
            <div class="goal-pct">${hitWeeks}/${trackedWeeks}</div>
        </div>
        <p class="goal-notes">${t('gymNotes')}</p>
        <div class="gym-tracker">
            <div class="gym-meta">
                <span><strong>${hitWeeks}</strong> ${t('gymHit')} · ${sumSessions} ${t('gymSessions')} · ${hitRate}%</span>
                ${streak > 0 ? `<span class="gym-streak">${t('gymStreak')} ${streak}</span>` : ''}
            </div>
            <div class="gym-grid">
                ${Array.from({ length: TOTAL_WEEKS_2026 }, (_, idx) => {
                    const week = idx + 1;
                    const count = state.gym[week] || 0;
                    const na = isNA(week);
                    const cur = isCurrent(week);
                    const fut = isFuture(week);
                    const cap = Math.min(count, 4);
                    const dateRange = fmtDateRange(2026, week, lang);
                    let tooltipBody;
                    if (na) {
                        tooltipBody = `${dateRange} · ${t('gymNA')}`;
                    } else if (cur) {
                        tooltipBody = `${dateRange} · ${t('gymCurrent')} · ${count}×`;
                    } else {
                        tooltipBody = `${dateRange} · ${t('gymWeek')} ${week} · ${count}×`;
                    }
                    const cls = ['gym-cell'];
                    if (na)  cls.push('na');
                    if (cur) cls.push('current');
                    if (fut) cls.push('future');
                    return `<div class="${cls.join(' ')}"
                                 data-week="${week}"
                                 data-count="${na ? 0 : cap}"
                                 ${na ? 'aria-disabled="true"' : ''}
                                 aria-label="${tooltipBody.replace(/"/g,'&quot;')}">
                                <span class="count">${!na && count > 0 ? count : ''}</span>
                                <span class="gym-tooltip">${tooltipBody}</span>
                            </div>`;
                }).join('')}
            </div>
            <div class="gym-legend">
                <span>${t('gymLegendLess')}</span>
                <span class="swatch" style="background: var(--track)"></span>
                <span class="swatch" style="background: color-mix(in srgb, var(--accent) 35%, var(--track))"></span>
                <span class="swatch" style="background: color-mix(in srgb, var(--accent) 65%, var(--track))"></span>
                <span class="swatch" style="background: var(--accent)"></span>
                <span>${t('gymLegendMore')}</span>
                <span style="margin-left: auto;">
                    <span class="swatch swatch-na"></span> ${t('gymNA')}
                </span>
            </div>
        </div>
    `;

    // Only current + future weeks are clickable. N/A weeks are inert.
    card.querySelectorAll('.gym-cell:not(.na):not(.future)').forEach(cell => {
        cell.addEventListener('click', () => {
            const w = +cell.dataset.week;
            state.gym[w] = ((state.gym[w] || 0) + 1) % 5;
            saveState();
            renderGoals();
            renderRing();
        });
        cell.addEventListener('contextmenu', e => {
            e.preventDefault();
            state.gym[+cell.dataset.week] = 0;
            saveState();
            renderGoals();
            renderRing();
        });
    });
    // Future weeks are visually dimmed but still show their tooltip on hover.

    return card;
}

/* ───── Aggregate ring ───── */
function renderRing() {
    // Equal weight per goal
    const booksRead = state.books.filter(b => b && b.trim()).length;
    const booksPct = Math.min(100, (booksRead / BOOK_TARGET) * 100);

    const w = state.weight;
    const weightPct = (typeof w !== 'number' || isNaN(w)) ? 0 : (w <= WEIGHT_TARGET ? 100 : 0);

    const now = new Date();
    const currentWeek = now.getFullYear() === 2026
        ? isoWeekOf(now)
        : (now.getFullYear() < 2026 ? 0 : TOTAL_WEEKS_2026);
    // Hit-rate over trackable weeks that have already elapsed
    // (start week → current week, inclusive). Pre-tracking weeks are excluded.
    const elapsedTrackable = Math.max(0,
        Math.min(TOTAL_WEEKS_2026, currentWeek) - GYM_TRACKING_START_WEEK + 1);
    const gymHits = state.gym.filter((c, i) =>
        i >= GYM_TRACKING_START_WEEK && i <= currentWeek && c >= GYM_WEEKLY_TARGET
    ).length;
    const gymPct = elapsedTrackable > 0
        ? Math.min(100, (gymHits / elapsedTrackable) * 100)
        : 0;

    const overall = Math.round((booksPct + weightPct + gymPct) / 3);
    const ring = document.getElementById('ring');
    ring.style.setProperty('--p', overall);
    document.getElementById('ringPct').textContent = overall + '%';
}

/* ───── Reset ───── */
function resetProgress() {
    if (confirm(t('confirmReset'))) {
        state = { books: Array(BOOK_TARGET).fill(''), weight: null, gym: Array(53).fill(0), lastUpdated: null };
        saveState();
        renderAll();
    }
}

/* ───── Theme & language ───── */
document.getElementById('yr').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');

const sunIcon = `<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="5"/>`;
const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        themeIcon.innerHTML = sunIcon;
        themeLabel.textContent = 'Light';
    } else {
        themeIcon.innerHTML = moonIcon;
        themeLabel.textContent = 'Dark';
    }
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
function toggleLang() {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', lang);
    renderAll();
}

// Expose to inline onclick handlers
window.toggleTheme = toggleTheme;
window.toggleLang = toggleLang;
window.resetProgress = resetProgress;

/* ─────────────────────────────────────────────
   Sync UI wiring (depends on window.GoalsSync)
   ───────────────────────────────────────────── */

const SYNC_T = {
    en: {
        notConfigured: 'Sync disabled (encrypted token not configured)',
        locked:        'Locked',
        idle:          'Unlocked',
        unlocking:     'Unlocking…',
        pulling:       'Pulling…',
        pushing:       'Pushing…',
        pulledOk:      'Pulled · ',
        pulledEmpty:   'Cloud gist is empty',
        pushedOk:      'Pushed · ',
        error:         'Error: ',
        pillOff:       'Sync off',
        pillLocked:    '🔒 Locked',
        pillReady:     'Synced',
        pillBusy:      'Syncing…',
        pillError:     'Sync error',
        replaceLocal:  'Replace local data with the cloud copy?',
        unlockPrompt:  'Enter unlock password:',
        unlockWrong:   'Wrong password — try again.',
        unlockedOk:    'Unlocked'
    },
    zh: {
        notConfigured: '同步已禁用（未配置加密令牌）',
        locked:        '已锁定',
        idle:          '已解锁',
        unlocking:     '解锁中…',
        pulling:       '拉取中…',
        pushing:       '推送中…',
        pulledOk:      '拉取成功 · ',
        pulledEmpty:   '云端 Gist 为空',
        pushedOk:      '推送成功 · ',
        error:         '错误：',
        pillOff:       '未同步',
        pillLocked:    '🔒 已锁定',
        pillReady:     '已同步',
        pillBusy:      '同步中…',
        pillError:     '同步错误',
        replaceLocal:  '使用云端数据覆盖本地数据？',
        unlockPrompt:  '请输入解锁密码：',
        unlockWrong:   '密码错误，请重试。',
        unlockedOk:    '已解锁'
    }
};
const st = key => SYNC_T[lang][key];

const syncBtn        = document.getElementById('syncBtn');
const syncLabel      = document.getElementById('syncLabel');
const syncModal      = document.getElementById('syncModal');
const syncStatusBox  = document.getElementById('syncStatusBox');
const syncStatusText = document.getElementById('syncStatusText');

let lastSyncedAt = null;
let lastError    = null;

function fmtAgo(ts) {
    if (!ts) return '';
    const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
    if (s < 5)  return lang === 'zh' ? '刚刚' : 'just now';
    if (s < 60) return lang === 'zh' ? `${s} 秒前` : `${s}s ago`;
    const m = Math.round(s / 60);
    if (m < 60) return lang === 'zh' ? `${m} 分钟前` : `${m}m ago`;
    const h = Math.round(m / 60);
    return lang === 'zh' ? `${h} 小时前` : `${h}h ago`;
}

function setPill(state, text) {
    syncBtn.classList.remove('is-ok', 'is-busy', 'is-error');
    if (state) syncBtn.classList.add('is-' + state);
    syncLabel.textContent = text;
}

function refreshPill() {
    if (!GoalsSync.hasEncryptedToken()) {
        setPill(null, st('pillOff'));
        return;
    }
    if (!GoalsSync.isUnlocked()) {
        setPill(null, st('pillLocked'));
        return;
    }
    if (lastError) {
        setPill('error', st('pillError'));
        return;
    }
    if (lastSyncedAt) {
        setPill('ok', `${st('pillReady')} · ${fmtAgo(lastSyncedAt)}`);
    } else {
        setPill('ok', st('pillReady'));
    }
}

function setStatusBox(state, text) {
    syncStatusBox.classList.remove('is-ok', 'is-busy', 'is-error');
    if (state) syncStatusBox.classList.add('is-' + state);
    syncStatusText.textContent = text;
}

function refreshStatusBox() {
    if (!GoalsSync.hasEncryptedToken()) return setStatusBox(null, st('notConfigured'));
    if (!GoalsSync.isUnlocked()) return setStatusBox(null, st('locked'));
    if (lastError) return setStatusBox('error', st('error') + lastError);
    if (lastSyncedAt) {
        setStatusBox('ok', fmtAgo(lastSyncedAt));
    } else {
        setStatusBox(null, st('idle'));
    }
}

function openSyncModal() {
    refreshStatusBox();
    syncModal.classList.add('open');
}
function closeSyncModal() {
    syncModal.classList.remove('open');
}

/** Prompt for unlock password until correct, or user cancels. Returns true on success. */
async function ensureUnlocked() {
    if (!GoalsSync.hasEncryptedToken()) return false;
    if (GoalsSync.isUnlocked()) return true;
    while (true) {
        const pwd = window.prompt(st('unlockPrompt'));
        if (pwd === null) return false; // cancelled
        try {
            setStatusBox('busy', st('unlocking'));
            await GoalsSync.unlock(pwd);
            lastError = null;
            refreshStatusBox();
            refreshPill();
            return true;
        } catch (e) {
            alert(st('unlockWrong'));
            // loop and prompt again
        }
    }
}

async function syncUnlock() {
    const ok = await ensureUnlocked();
    if (ok) {
        // After successful unlock, try a silent pull right away
        await syncPullNow({ silent: true });
    }
}

function syncLock() {
    GoalsSync.lock();
    lastSyncedAt = null;
    lastError = null;
    refreshStatusBox();
    refreshPill();
}

async function syncPullNow(opts = {}) {
    const silent = !!opts.silent;
    if (!GoalsSync.hasEncryptedToken()) {
        if (!silent) openSyncModal();
        return;
    }
    if (!GoalsSync.isUnlocked()) {
        if (silent) return;          // never auto-prompt
        const ok = await ensureUnlocked();
        if (!ok) return;
    }
    setStatusBox('busy', st('pulling'));
    setPill('busy', st('pillBusy'));
    try {
        const remote = await GoalsSync.pull();
        if (!remote) {
            setStatusBox('ok', st('pulledEmpty'));
            lastSyncedAt = Date.now();
            refreshPill();
            return;
        }
        // Last-write-wins by lastUpdated timestamp
        const localTs = state.lastUpdated ? Date.parse(state.lastUpdated) : 0;
        const remoteTs = remote.lastUpdated ? Date.parse(remote.lastUpdated) : 0;
        if (localTs > remoteTs) {
            if (silent) {
                // Auto-pull on load: keep local (it's newer), don't prompt.
                lastError = null;
                lastSyncedAt = Date.now();
                setStatusBox('ok', st('pulledOk') + fmtAgo(lastSyncedAt));
                refreshPill();
                return;
            }
            const ok = confirm(st('replaceLocal'));
            if (!ok) {
                lastError = null;
                lastSyncedAt = Date.now();
                refreshStatusBox();
                refreshPill();
                return;
            }
        }
        // Apply remote
        state = {
            books:  Array.isArray(remote.books)  ? remote.books  : Array(BOOK_TARGET).fill(''),
            weight: typeof remote.weight === 'number' ? remote.weight : null,
            gym:    Array.isArray(remote.gym) && remote.gym.length === 53 ? remote.gym : Array(53).fill(0),
            lastUpdated: remote.lastUpdated || new Date().toISOString()
        };
        saveState();
        renderAll();
        lastError = null;
        lastSyncedAt = Date.now();
        setStatusBox('ok', st('pulledOk') + fmtAgo(lastSyncedAt));
        refreshPill();
    } catch (e) {
        lastError = e.message;
        setStatusBox('error', st('error') + e.message);
        refreshPill();
    }
}

async function syncPushNow() {
    if (!GoalsSync.hasEncryptedToken()) { openSyncModal(); return; }
    if (!GoalsSync.isUnlocked()) {
        const ok = await ensureUnlocked();
        if (!ok) return;
    }
    setStatusBox('busy', st('pushing'));
    setPill('busy', st('pillBusy'));
    try {
        const payload = {
            books: state.books,
            weight: state.weight,
            gym: state.gym
        };
        await GoalsSync.push(payload);
        // Update local lastUpdated to the push moment so future pulls compare correctly
        state.lastUpdated = new Date().toISOString();
        saveState();
        lastError = null;
        lastSyncedAt = Date.now();
        setStatusBox('ok', st('pushedOk') + fmtAgo(lastSyncedAt));
        refreshPill();
    } catch (e) {
        lastError = e.message;
        setStatusBox('error', st('error') + e.message);
        refreshPill();
    }
}

// Re-render labels when language changes
const _origToggleLang = toggleLang;
window.toggleLang = function () {
    _origToggleLang();
    refreshPill();
    if (syncModal.classList.contains('open')) refreshStatusBox();
};

// Expose modal handlers
window.openSyncModal  = openSyncModal;
window.closeSyncModal = closeSyncModal;
window.syncPullNow    = syncPullNow;
window.syncPushNow    = syncPushNow;
window.syncUnlock     = syncUnlock;
window.syncLock       = syncLock;

// Esc to close modal
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && syncModal.classList.contains('open')) closeSyncModal();
});

/* ───── Auto-pull on load (only if already unlocked from sessionStorage) ───── */
async function autoPullOnLoad() {
    if (!GoalsSync.hasEncryptedToken() || !GoalsSync.isUnlocked()) {
        refreshPill();
        refreshStatusBox();
        return;
    }
    try {
        await syncPullNow({ silent: true });
    } catch {/* refreshPill handles error state */}
}

/* ───── Init ───── */
renderAll();
setInterval(renderYear, 60000);
setInterval(refreshPill, 60000); // tick "Synced 2m ago" label
refreshPill();
autoPullOnLoad();
