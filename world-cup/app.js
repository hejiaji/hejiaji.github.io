/* ───── i18n display helpers ───── */
function dispTeam(name)   { return lang === "zh" ? (typeof teamZh === "function" ? teamZh(name) : name) : name; }
function dispClub(name)   { return lang === "zh" ? (typeof clubZh === "function" ? clubZh(name) : name) : name; }
function dispPlayer(name) { return lang === "zh" ? (typeof playerZh === "function" ? playerZh(name) : name) : name; }

/* ───── i18n ───── */
const I18N = {
    en: {
        groupView: "Group view (A – L)",
        confLabel: { UEFA: "UEFA", CONMEBOL: "CONMEBOL", CONCACAF: "CONCACAF", AFC: "AFC", CAF: "CAF", OFC: "OFC" },
        groupHdr: g => `Group ${g}`,
        big4InGroup: n => `${n} Big-4 player${n === 1 ? "" : "s"}`,
        big4Card: n => `${n} <span>Big-4</span>`,
        countNote: (shown, total) => `Showing ${shown} of ${total} teams`,
        rivalsLabel: g => `Group ${g} opponents:`,
        recentMatches: "Recent matches",
        fetching: "⏳ Fetching live match data from openfootball…",
        loadFail: e => `Could not load match data (${e}).`,
        lastN: n => `Last ${n} match${n === 1 ? "" : "es"} · WC 2026`,
        played: "Played", won: "Won", drew: "Drew", lost: "Lost", gfga: "GF:GA",
        noMatches: "No WC 2026 matches played yet for this team.",
        homeAbbr: "H", awayAbbr: "A",
        homeFull: "Home", awayFull: "Away",
        moreStats: "📊 More stats (possession, shots, passes)",
        ht: "HT",
        noGoals: "No goals",
        modalSub: (conf, count) => `${conf} · ${count} player${count === 1 ? "" : "s"} in Europe's Big 4`,
        modalSubGroup: (group, conf, count) => `Group ${group} · ${conf} · ${count} player${count === 1 ? "" : "s"} in Europe's Big 4`,
        leagueHeading: { PL: "Premier League", LIGA: "La Liga", BUND: "Bundesliga", SA: "Serie A" },
        notInBig4: "Players not in the Big 4 (top reps shown)",
        bigFourSummary: n => `${n} Big-4 players`,
        noPlayers: "No notable Big-4 reps listed for this team.",
        themeDark: "Dark", themeLight: "Light",
        months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        monthsFull: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        koRounds: {
            "Round of 32": "Round of 32",
            "Round of 16": "Round of 16",
            "Quarter-finals": "Quarter-finals",
            "Semi-finals": "Semi-finals",
            "Match for third place": "Third-place play-off",
            "Final": "Final"
        },
        koTbd: "TBD",
        koPenalties: "pen",
        koAet: "AET",
        koFt: "FT",
        koEmpty: "No knockout matches yet. Once group stage concludes, the bracket will fill in here.",
        koFetching: "⏳ Loading knockout matches from openfootball…",
        koWinner: "Winner",
        knockoutTab: "Knockout",
        modalMatchTitle: (round) => `${round}`,
        modalVenue: "Venue",
        modalDate: "Date",
        modalKickoff: "Kick-off",
        modalGoals: "Goals",
        modalNoGoals: "No goals recorded",
        modalNotPlayed: "Match has not started yet",
        modalPenWinner: (name) => `${name} won on penalties`,
        modalViewTeam: (name) => `View ${name} squad →`
    },
    zh: {
        groupView: "按小组（A – L）",
        confLabel: { UEFA: "欧足联", CONMEBOL: "南美足联", CONCACAF: "中北美足联", AFC: "亚足联", CAF: "非足联", OFC: "大洋洲足联" },
        groupHdr: g => `${g} 组`,
        big4InGroup: n => `${n} 名四大联赛球员`,
        big4Card: n => `${n} <span>四大联赛</span>`,
        countNote: (shown, total) => `显示 ${shown} / ${total} 支球队`,
        rivalsLabel: g => `${g} 组对手：`,
        recentMatches: "近期比赛",
        fetching: "⏳ 正在从 openfootball 获取实时数据…",
        loadFail: e => `无法加载比赛数据（${e}）。`,
        lastN: n => `最近 ${n} 场 · 2026 世界杯`,
        played: "已踢", won: "胜", drew: "平", lost: "负", gfga: "进:失",
        noMatches: "本队尚未在 2026 世界杯出场。",
        homeAbbr: "主", awayAbbr: "客",
        homeFull: "主场", awayFull: "客场",
        moreStats: "📊 更多数据（控球、射门、传球）",
        ht: "半场",
        noGoals: "未进球",
        modalSub: (conf, count) => `${conf} · ${count} 名球员效力于欧洲四大联赛`,
        modalSubGroup: (group, conf, count) => `${group} 组 · ${conf} · ${count} 名球员效力于欧洲四大联赛`,
        leagueHeading: { PL: "英超", LIGA: "西甲", BUND: "德甲", SA: "意甲" },
        notInBig4: "其他球员（非四大联赛，仅显示部分）",
        bigFourSummary: n => `${n} 名四大联赛球员`,
        noPlayers: "本队暂无四大联赛代表球员。",
        themeDark: "深色", themeLight: "浅色",
        months: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        monthsFull: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        koRounds: {
            "Round of 32": "32 强",
            "Round of 16": "16 强",
            "Quarter-finals": "8 强",
            "Semi-finals": "4 强",
            "Match for third place": "三、四名决赛",
            "Final": "决赛"
        },
        koTbd: "待定",
        koPenalties: "点",
        koAet: "加时",
        koFt: "终",
        koEmpty: "暂无淘汰赛比赛。小组赛结束后，对阵图将在此显示。",
        koFetching: "⏳ 正在从 openfootball 加载淘汰赛比赛…",
        koWinner: "冠军",
        knockoutTab: "淘汰赛",
        modalMatchTitle: (round) => `${round}`,
        modalVenue: "场馆",
        modalDate: "日期",
        modalKickoff: "开球时间",
        modalGoals: "进球",
        modalNoGoals: "暂无进球记录",
        modalNotPlayed: "比赛尚未开始",
        modalPenWinner: (name) => `${name} 通过点球大战获胜`,
        modalViewTeam: (name) => `查看 ${name} 阵容 →`
    }
};
let lang = localStorage.getItem("wc-lang") || "zh";
function L() { return I18N[lang]; }
function applyLang() {
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
    document.querySelectorAll("[data-en]").forEach(el => {
        const v = el.getAttribute("data-" + lang);
        if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
        const v = el.getAttribute("data-" + lang + "-placeholder");
        if (v != null) el.placeholder = v;
    });
    const btn = document.getElementById("langLabel");
    if (btn) btn.textContent = lang === "zh" ? "EN" : "中文";
    const title = document.querySelector("title");
    if (title) {
        const v = title.getAttribute("data-" + lang);
        if (v) document.title = v;
    }
}
function toggleLang() {
    lang = lang === "zh" ? "en" : "zh";
    localStorage.setItem("wc-lang", lang);
    applyLang();
    renderTeams();
    renderKnockout();
    // Re-render any open modal (team or knockout match)
    const modal = document.getElementById("teamModal");
    if (modal && modal.classList.contains("open")) {
        const titleEl = document.getElementById("modalTitle");
        const koNum = titleEl ? titleEl.getAttribute("data-ko-num") : null;
        const name = titleEl ? titleEl.getAttribute("data-team-name") : null;
        if (koNum) openKoMatch(parseInt(koNum, 10));
        else if (name) openTeam(name);
    }
}

/* Tabs */
function switchTab(tab) {
    const tabs = ["groups", "knockout"];
    tabs.forEach(t => {
        const btn = document.getElementById("tab-" + t);
        const panel = document.getElementById("panel-" + t);
        if (!btn || !panel) return;
        const active = (t === tab);
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        panel.classList.toggle("active", active);
    });
    if (tab === "knockout") renderKnockout();
}

/* ─────────────────────────────────────────────
 *  World Cup 2026 — page logic
 * ───────────────────────────────────────────── */

document.getElementById("yr").textContent = new Date().getFullYear();

/* Theme toggle */
function applyTheme(th) {
    document.documentElement.setAttribute("data-theme", th);
    localStorage.setItem("wc26_theme", th);
    const lbl = document.getElementById("themeLabel");
    if (lbl) lbl.textContent = th === "dark" ? L().themeLight : L().themeDark;
}
function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(cur === "dark" ? "light" : "dark");
}
/* Helpers */
function bigFourCount(team) {
    return team.players.filter(p => p.league && LEAGUES[p.league]).length;
}
function leaguesPresent(team) {
    const set = new Set();
    team.players.forEach(p => { if (p.league && LEAGUES[p.league]) set.add(p.league); });
    return set;
}

function teamCardHTML(team) {
    const n = bigFourCount(team);
    const present = leaguesPresent(team);
    const dot = (key, active) =>
        `<span class="dot ${key} ${active ? "active" : ""}"></span>`;
    return `
        <article class="team-card" onclick="openTeam('${team.name.replace(/'/g, "\\'")}')">
            <div class="team-head">
                <span class="flag">${team.flag}</span>
                <span class="team-name">${dispTeam(team.name)}</span>
                <span class="conf-tag">${L().confLabel[team.conf] || team.conf}</span>
            </div>
            <div class="big4-row">
                <span class="big4-num">${n}</span>
                <span class="big4-lbl">${lang === "zh" ? "名四大联赛球员" : "Big 4 player" + (n === 1 ? "" : "s")}</span>
            </div>
            <div class="league-dots" title="Leagues represented">
                ${dot("pl",     present.has("PL"))}
                ${dot("laliga", present.has("LL"))}
                ${dot("bundes", present.has("BL"))}
                ${dot("seriea", present.has("SA"))}
            </div>
        </article>
    `;
}

/* Render — supports two modes: by Group (default) and Flat list */
function renderTeams() {
    const wrap = document.getElementById("teamGrid");
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    const sort = document.getElementById("sortSel").value;

    let list = TEAMS.slice();
    if (q) {
        list = list.filter(t =>
            t.name.toLowerCase().includes(q) ||
            t.conf.toLowerCase().includes(q) ||
            ("group " + (t.group || "").toLowerCase()).includes(q) ||
            (t.group && t.group.toLowerCase() === q)
        );
    }

    document.getElementById("countNote").textContent = L().countNote(list.length, TEAMS.length);

    if (sort === "group") {
        // Group view: bucket by group letter
        const buckets = {};
        list.forEach(t => {
            const g = t.group || "?";
            (buckets[g] = buckets[g] || []).push(t);
        });
        const groupLetters = Object.keys(buckets).sort();
        wrap.innerHTML = groupLetters.map(g => {
            const teams = buckets[g].sort((a, b) => bigFourCount(b) - bigFourCount(a) || a.name.localeCompare(b.name));
            const total = teams.reduce((s, t) => s + bigFourCount(t), 0);
            return `
                <section class="group-block">
                    <header class="group-header">
                        <span class="group-letter">${L().groupHdr(g)}</span>
                        <span class="group-meta">${lang === "zh" ? `${teams.length} 支球队 · ${L().big4InGroup(total)}` : `${teams.length} team${teams.length === 1 ? "" : "s"} · ${L().big4InGroup(total)}`}</span>
                    </header>
                    <div class="group-grid">
                        ${teams.map(teamCardHTML).join("")}
                    </div>
                </section>
            `;
        }).join("");
    } else {
        list.sort((a, b) => {
            if (sort === "big4_desc") return bigFourCount(b) - bigFourCount(a) || a.name.localeCompare(b.name);
            if (sort === "big4_asc")  return bigFourCount(a) - bigFourCount(b) || a.name.localeCompare(b.name);
            if (sort === "conf")      return a.conf.localeCompare(b.conf) || a.name.localeCompare(b.name);
            return a.name.localeCompare(b.name);
        });
        wrap.innerHTML = `<div class="group-grid flat">${list.map(teamCardHTML).join("")}</div>`;
    }
}

/* Detail modal */
function openTeam(name) {
    const team = TEAMS.find(t => t.name === name);
    if (!team) return;

    document.getElementById("modalFlag").textContent = team.flag;
    const titleEl = document.getElementById("modalTitle");
    titleEl.textContent = dispTeam(team.name);
    titleEl.setAttribute("data-team-name", team.name);
    titleEl.removeAttribute("data-ko-num");
    const n = bigFourCount(team);
    const confLocal = L().confLabel[team.conf] || team.conf;
    document.getElementById("modalSub").textContent = L().modalSubGroup(team.group, confLocal, n);

    const body = document.getElementById("modalBody");
    const big4 = team.players.filter(p => p.league && LEAGUES[p.league]);
    const others = team.players.filter(p => !p.league || !LEAGUES[p.league]);

    // Group rivals box
    const rivals = TEAMS.filter(t => t.group === team.group && t.name !== team.name);
    const rivalsBlock = rivals.length ? `
        <div class="rivals-box">
            <div class="rivals-label">${L().rivalsLabel(team.group)}</div>
            <div class="rivals-list">
                ${rivals.map(r => `<span class="rival-chip" onclick="openTeam('${r.name.replace(/'/g, "\\'")}')">${r.flag} ${dispTeam(r.name)}</span>`).join("")}
            </div>
        </div>` : "";

    // Form & last-10 matches block
    const matches = (MATCHES && MATCHES[team.name]) ? MATCHES[team.name] : [];
    let formBlock = "";
    if (!MATCHES_LOADED) {
        formBlock = `
            <div class="form-section">
                <div class="form-title">${L().recentMatches}</div>
                <div class="empty-state">${L().fetching}</div>
            </div>
        `;
    } else if (MATCHES_ERROR) {
        formBlock = `
            <div class="form-section">
                <div class="form-title">${L().recentMatches}</div>
                <div class="empty-state">${L().loadFail(MATCHES_ERROR)}</div>
            </div>
        `;
    } else if (matches.length) {
        const w = matches.filter(m => m.result === "W").length;
        const d = matches.filter(m => m.result === "D").length;
        const l = matches.filter(m => m.result === "L").length;
        const gf = matches.reduce((s, m) => s + parseInt(m.score.split("-")[0], 10), 0);
        const ga = matches.reduce((s, m) => s + parseInt(m.score.split("-")[1], 10), 0);

        // Form pills in chronological order (oldest -> newest reads L→R)
        const formPills = matches.slice().reverse()
            .map(m => `<span class="form-pill ${m.result}" title="${formatDate(m.date)} vs ${m.opponent} (${m.score})">${m.result}</span>`)
            .join("");

        const rows = matches.map((m, i) => `
            <li class="match-row" onclick="toggleMatch('${team.name.replace(/'/g, "\\'")}', ${i})" data-match-idx="${i}">
                <span class="match-date">${formatDate(m.date)}</span>
                <span class="match-ha" title="${m.home ? L().homeFull : L().awayFull}">${m.home ? L().homeAbbr : L().awayAbbr}</span>
                <span class="match-opp">${dispTeam(m.opponent)}</span>
                <span class="match-score">${m.score}</span>
                <span class="match-result ${m.result}">${m.result}</span>
                <span class="match-chev">▸</span>
            </li>
            <li class="match-detail" id="match-detail-${i}" hidden></li>
        `).join("");

        formBlock = `
            <div class="form-section">
                <div class="form-title">${L().lastN(matches.length)}</div>
                <div class="stat-grid">
                    <div class="stat-tile"><div class="stat-num">${matches.length}</div><span class="stat-lbl">${L().played}</span></div>
                    <div class="stat-tile"><div class="stat-num w">${w}</div><span class="stat-lbl">${L().won}</span></div>
                    <div class="stat-tile"><div class="stat-num d">${d}</div><span class="stat-lbl">${L().drew}</span></div>
                    <div class="stat-tile"><div class="stat-num l">${l}</div><span class="stat-lbl">${L().lost}</span></div>
                    <div class="stat-tile"><div class="stat-num">${gf}:${ga}</div><span class="stat-lbl">${L().gfga}</span></div>
                </div>
                <div class="form-row">${formPills}</div>
                <ul class="match-list">${rows}</ul>
            </div>
        `;
    } else {
        formBlock = `
            <div class="form-section">
                <div class="form-title">${L().recentMatches}</div>
                <div class="empty-state">${L().noMatches}</div>
            </div>
        `;
    }

    let bodyHTML = formBlock + rivalsBlock;

    if (big4.length === 0 && others.length === 0) {
        bodyHTML += `<div class="empty-state">${L().noPlayers}</div>`;
    } else {
        const leagueZh = { PL: "英超", LL: "西甲", BL: "德甲", SA: "意甲" };
        const order = ["PL", "LL", "BL", "SA"];
        const groups = order.map(code => {
            const l = LEAGUES[code];
            const players = big4.filter(p => p.league === code);
            if (!players.length) return "";
            const lname = lang === "zh" ? (leagueZh[code] || l.name) : l.name;
            return `
                <div class="league-grouping">
                    <div class="league-title">
                        <span class="league-pill" style="background:${l.color}"></span>
                        ${lname} · ${players.length}
                    </div>
                    <ul class="player-list">
                        ${players.map(p => playerRow(p)).join("")}
                    </ul>
                </div>
            `;
        }).join("");

        let otherBlock = "";
        if (others.length) {
            const outsideLbl = lang === "zh" ? "其他联赛" : "Outside Big 4";
            otherBlock = `
                <div class="league-grouping">
                    <div class="league-title">
                        <span class="league-pill" style="background:var(--text-dim)"></span>
                        ${outsideLbl} · ${others.length}
                    </div>
                    <ul class="player-list">
                        ${others.map(p => playerRow(p)).join("")}
                    </ul>
                </div>
            `;
        }
        bodyHTML += (groups || `<div class="empty-state">${L().noPlayers}</div>`) + otherBlock;
    }

    body.innerHTML = bodyHTML;
    document.getElementById("teamModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function formatDate(iso) {
    const [y, m, d] = iso.split("-");
    if (lang === "zh") return `${parseInt(m, 10)}月${parseInt(d, 10)}日`;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`;
}

function formatDateFull(iso) {
    const [y, m, d] = iso.split("-");
    if (lang === "zh") return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function googleMatchUrl(home, away, isoDate) {
    // Google query that triggers the match-stats panel like the user's example
    const [y, m, d] = isoDate.split("-");
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const dateStr = `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
    const q = encodeURIComponent(`${home} vs ${away} ${dateStr} stats`);
    return `https://www.google.com/search?q=${q}`;
}

function goalLine(g) {
    const pen = g.penalty ? (lang === "zh" ? "（点）" : " (pen)") : "";
    const og = g.owngoal ? (lang === "zh" ? "（乌龙）" : " (OG)") : "";
    return `<li><span class="goal-min">${g.minute}'</span> <span class="goal-name">${dispPlayer(g.name)}${pen}${og}</span></li>`;
}

function toggleMatch(teamName, idx) {
    const team = TEAMS.find(t => t.name === teamName);
    if (!team) return;
    const m = (MATCHES[teamName] || [])[idx];
    if (!m) return;

    const detail = document.getElementById(`match-detail-${idx}`);
    if (!detail) return;

    // Toggle off if already open
    if (!detail.hasAttribute("hidden")) {
        detail.setAttribute("hidden", "");
        detail.innerHTML = "";
        return;
    }

    // Build detail HTML
    const homeName  = m.home ? team.name     : m.opponent;
    const awayName  = m.home ? m.opponent    : team.name;
    const homeFlag  = m.home ? team.flag     : (TEAMS.find(t => t.name === m.opponent)?.flag || "🏳️");
    const awayFlag  = m.home ? (TEAMS.find(t => t.name === m.opponent)?.flag || "🏳️") : team.flag;
    const [gf, ga]  = m.score.split("-").map(Number);
    const [hgf, hga] = m.htScore ? m.htScore.split("-").map(Number) : [null, null];
    const homeGoals = m.home ? (m.ownGoals  || []) : (m.oppGoals || []);
    const awayGoals = m.home ? (m.oppGoals || []) : (m.ownGoals || []);
    const homeScore = m.home ? gf : ga;
    const awayScore = m.home ? ga : gf;
    const homeHt    = (hgf !== null) ? (m.home ? hgf : hga) : null;
    const awayHt    = (hgf !== null) ? (m.home ? hga : hgf) : null;

    detail.innerHTML = `
        <div class="match-detail-card">
            <header class="md-meta">
                <span>${m.round}${m.group ? " · " + m.group : ""}</span>
                <span>${formatDateFull(m.date)}${m.time ? " · " + m.time : ""}</span>
                ${m.ground ? `<span>📍 ${m.ground}</span>` : ""}
            </header>
            <div class="md-scoreboard">
                <div class="md-team md-home">
                    <span class="md-flag">${homeFlag}</span>
                    <span class="md-name">${dispTeam(homeName)}</span>
                </div>
                <div class="md-score">
                    <div class="md-ft">${homeScore} <span>–</span> ${awayScore}</div>
                    ${homeHt !== null ? `<div class="md-ht">${L().ht} ${homeHt} – ${awayHt}</div>` : ""}
                </div>
                <div class="md-team md-away">
                    <span class="md-name">${dispTeam(awayName)}</span>
                    <span class="md-flag">${awayFlag}</span>
                </div>
            </div>
            <div class="md-goals">
                <ul class="goal-col goal-home">
                    ${homeGoals.length ? homeGoals.map(goalLine).join("") : `<li class="no-goals">${L().noGoals}</li>`}
                </ul>
                <ul class="goal-col goal-away">
                    ${awayGoals.length ? awayGoals.map(goalLine).join("") : `<li class="no-goals">${L().noGoals}</li>`}
                </ul>
            </div>
            <div class="md-links">
                <a class="md-link" href="${googleMatchUrl(homeName, awayName, m.date)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
                    ${L().moreStats}
                </a>
            </div>
        </div>
    `;
    detail.removeAttribute("hidden");

    // Rotate the chevron on the parent row
    const row = detail.previousElementSibling;
    if (row) row.classList.add("expanded");
}

function playerRow(p) {
    return `
        <li class="player-row">
            <span class="pos-tag pos-${p.pos}">${p.pos}</span>
            <span class="player-name">${dispPlayer(p.name)}</span>
            <span class="player-club">${dispClub(p.club)}</span>
        </li>
    `;
}

function closeModal() {
    document.getElementById("teamModal").classList.remove("open");
    document.body.style.overflow = "";
}

/* ───── Knockout bracket ───── */
const KO_ROUND_ORDER = [
    "Round of 32",
    "Round of 16",
    "Quarter-finals",
    "Semi-finals",
    "Match for third place",
    "Final"
];

// Normalize knockout-round labels. Group-stage matches use "Matchday N" — we
// must ignore those, otherwise "Matchday 16" / "Matchday 32" would leak into
// the Round of 16 / Round of 32 buckets.
function normalizeRound(r) {
    if (!r) return "";
    const lower = String(r).trim().toLowerCase();
    if (lower.startsWith("matchday")) return "";                // group stage
    if (lower === "round of 32" || lower === "round of thirty-two") return "Round of 32";
    if (lower === "round of 16" || lower === "round of sixteen") return "Round of 16";
    if (lower === "quarter-final" || lower === "quarter-finals" || lower === "quarterfinal" || lower === "quarterfinals") return "Quarter-finals";
    if (lower === "semi-final" || lower === "semi-finals" || lower === "semifinal" || lower === "semifinals") return "Semi-finals";
    if (lower === "match for third place" || lower === "third-place play-off" || lower === "third place play-off" || lower === "third-place playoff" || lower === "3rd place play-off") return "Match for third place";
    if (lower === "final") return "Final";
    return "";
}

function teamFlag(name) {
    const t = TEAMS.find(x => x.name === name);
    return t ? t.flag : "";
}

// Given a single match, determine winner/loser team names (returns nulls if undecided)
function matchOutcome(m) {
    if (!m || !m.ft || m.ft.length !== 2 || !m.team1 || !m.team2) return { winner: null, loser: null };
    const [g1, g2] = m.ft;
    if (g1 > g2) return { winner: m.team1, loser: m.team2 };
    if (g1 < g2) return { winner: m.team2, loser: m.team1 };
    if (m.pen && m.pen.length === 2) {
        return m.pen[0] > m.pen[1]
            ? { winner: m.team1, loser: m.team2 }
            : { winner: m.team2, loser: m.team1 };
    }
    return { winner: null, loser: null };
}

// Resolve openfootball placeholders like "W73" / "L101" → real team names
function resolveTeam(slot, winners, losers) {
    if (!slot) return null;
    const s = String(slot).trim();
    const m = s.match(/^([WL])(\d+)$/i);
    if (!m) {
        // Real team name — only return if it exists in TEAMS list
        const c = canon(s);
        return TEAMS.find(t => t.name === c) ? c : null;
    }
    const kind = m[1].toUpperCase();
    const num = parseInt(m[2], 10);
    return (kind === "W") ? (winners[num] || null) : (losers[num] || null);
}

/* Format the date/time label for a knockout fixture card
 * "Today" / "Tomorrow" / "Sun, 5 July, 3:00 am" */
function koDateTimeLabel(m) {
    if (!m || !m.date) return "";
    const [y, mo, d] = m.date.split("-").map(Number);
    // Build a local Date assuming the date string is YYYY-MM-DD; we compare day-only.
    const matchDay = new Date(y, mo - 1, d);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((matchDay - today) / 86400000);

    let dayLabel;
    if (diffDays === 0)      dayLabel = lang === "zh" ? "今天" : "Today";
    else if (diffDays === 1) dayLabel = lang === "zh" ? "明天" : "Tomorrow";
    else if (diffDays === -1) dayLabel = lang === "zh" ? "昨天" : "Yesterday";
    else {
        if (lang === "zh") {
            const wkZh = ["日","一","二","三","四","五","六"];
            dayLabel = `${mo}月${d}日 周${wkZh[matchDay.getDay()]}`;
        } else {
            const wk = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            dayLabel = `${wk[matchDay.getDay()]}, ${d} ${months[mo - 1]}`;
        }
    }

    // Append time when in the future (or today), formatted as locale time when possible
    if (diffDays >= 0 && m.time) {
        const timeTxt = formatKoTime(m.time);
        if (timeTxt) return `${dayLabel}, ${timeTxt}`;
    }
    return dayLabel;
}

function formatKoTime(timeStr) {
    // openfootball times look like "12:00 UTC-7"; just strip the TZ for now
    const m = timeStr.match(/^(\d{1,2}):(\d{2})/);
    if (!m) return "";
    let h = parseInt(m[1], 10), mm = m[2];
    if (lang === "zh") return `${h}:${mm}`;
    const ampm = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${mm} ${ampm}`;
}

function koSideHtml(team, score, isWinner, isLoser, isPen) {
    let nameHtml;
    if (team) {
        const cls = "ko-name" + (isLoser ? " loser" : "") + (isWinner ? " winner" : "");
        nameHtml = `<span class="${cls}">${dispTeam(team)}</span>`;
    } else {
        nameHtml = `<span class="ko-name ko-tbd-text">${L().koTbd}</span>`;
    }
    const flag = team ? teamFlag(team) : `<span class="ko-shield">🛡</span>`;
    let scoreHtml = "";
    if (score !== null && score !== undefined && score !== "") {
        if (isPen) scoreHtml = `${score.ft}<sup>(${score.pen})</sup>`;
        else scoreHtml = `${score}`;
    }
    const arrow = isWinner ? `<span class="ko-arrow">◀</span>` : `<span class="ko-arrow-spacer"></span>`;
    return `
        <div class="ko-side">
            <span class="ko-flag">${flag}</span>
            ${nameHtml}
            <span class="ko-goal">${scoreHtml}</span>
            ${arrow}
        </div>
    `;
}

function koMatchCard(m, resolvedT1, resolvedT2) {
    const t1 = resolvedT1;
    const t2 = resolvedT2;
    const hasResult = m && m.ft && m.ft.length === 2 && t1 && t2;
    let s1 = "", s2 = "", w1 = false, w2 = false, isPen = false;
    if (hasResult) {
        const [g1, g2] = m.ft;
        s1 = g1; s2 = g2;
        if (g1 > g2)      { w1 = true; }
        else if (g1 < g2) { w2 = true; }
        else if (m.pen && m.pen.length === 2) {
            isPen = true;
            const [p1, p2] = m.pen;
            s1 = { ft: g1, pen: p1 };
            s2 = { ft: g2, pen: p2 };
            if (p1 > p2)      w1 = true;
            else if (p1 < p2) w2 = true;
        }
    }
    const l1 = hasResult && !w1;
    const l2 = hasResult && !w2;
    const headerLabel = koDateTimeLabel(m);
    const ftPill = hasResult ? `<span class="ko-ft-pill">${L().koFt}</span>` : "";
    const numAttr = m && m.num ? `data-num="${m.num}"` : "";
    const clickAttr = m && m.num ? `onclick="openKoMatch(${m.num})" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openKoMatch(${m.num});}"` : "";
    return `
        <article class="ko-match ${hasResult ? "is-played" : "is-upcoming"}" ${numAttr} ${clickAttr}>
            <header class="ko-card-head">
                <span class="ko-when">${headerLabel}</span>
                ${ftPill}
            </header>
            ${koSideHtml(t1, s1, w1, l1, isPen)}
            ${koSideHtml(t2, s2, w2, l2, isPen)}
        </article>
    `;
}

/* Open the match-detail modal for the given openfootball match number */
function openKoMatch(num) {
    const raw = (ALL_MATCHES || []).find(x => x.num === num);
    if (!raw) return;

    // Resolve winners map (so W##/L## placeholders show the actual team names)
    const winners = {}, losers = {};
    (ALL_MATCHES || []).forEach(m => {
        if (!m.num) return;
        const t1 = resolveTeam(m.team1, winners, losers);
        const t2 = resolveTeam(m.team2, winners, losers);
        const { winner, loser } = matchOutcome({ ...m, team1: t1, team2: t2 });
        if (winner) winners[m.num] = winner;
        if (loser)  losers[m.num]  = loser;
    });
    const t1 = resolveTeam(raw.team1, winners, losers);
    const t2 = resolveTeam(raw.team2, winners, losers);

    const hasResult = raw.ft && raw.ft.length === 2 && t1 && t2;
    let w1 = false, w2 = false, isPen = false;
    if (hasResult) {
        const [g1, g2] = raw.ft;
        if (g1 > g2) w1 = true;
        else if (g1 < g2) w2 = true;
        else if (raw.pen && raw.pen.length === 2) {
            isPen = true;
            if (raw.pen[0] > raw.pen[1]) w1 = true;
            else if (raw.pen[0] < raw.pen[1]) w2 = true;
        }
    }

    const roundDisp = L().koRounds[normalizeRound(raw.round)] || raw.round;

    // --- Header
    document.getElementById("modalFlag").textContent = "⚽";
    const titleEl = document.getElementById("modalTitle");
    titleEl.textContent = roundDisp;
    titleEl.setAttribute("data-team-name", "");                  // not a team modal
    titleEl.setAttribute("data-ko-num", String(num));            // remember for language toggle
    const subEl = document.getElementById("modalSub");
    const dateLine = raw.date ? koDateTimeLabel(raw) : "";
    subEl.textContent = [dateLine, raw.ground].filter(Boolean).join(" · ");

    // --- Scoreline / teams
    const sideHtml = (team, isWinner, score, isPenScore) => {
        const flag = team ? teamFlag(team) : "🛡";
        const name = team ? dispTeam(team) : L().koTbd;
        const cls = isWinner ? "match-team winner" : "match-team";
        const scoreBlock = (score === undefined || score === null)
            ? ""
            : (isPenScore ? `<span class="match-score">${score.ft}<sup>(${score.pen})</sup></span>`
                          : `<span class="match-score">${score}</span>`);
        return `
            <div class="${cls}">
                <span class="match-flag">${flag}</span>
                <span class="match-name">${name}</span>
                ${scoreBlock}
            </div>
        `;
    };

    let s1, s2;
    if (hasResult) {
        if (isPen) {
            s1 = { ft: raw.ft[0], pen: raw.pen[0] };
            s2 = { ft: raw.ft[1], pen: raw.pen[1] };
        } else {
            s1 = raw.ft[0];
            s2 = raw.ft[1];
        }
    }

    const scoreboard = `
        <div class="match-scoreboard">
            ${sideHtml(t1, w1, s1, isPen)}
            <span class="match-vs">${hasResult ? "" : "vs"}</span>
            ${sideHtml(t2, w2, s2, isPen)}
        </div>
        ${isPen ? `<div class="match-penalty-note">${L().modalPenWinner(dispTeam(w1 ? t1 : t2))}</div>` : ""}
    `;

    // --- Meta grid
    const metaItems = [];
    if (raw.date)   metaItems.push({ k: L().modalDate, v: formatDateFull(raw.date) });
    if (raw.time)   metaItems.push({ k: L().modalKickoff, v: raw.time });
    if (raw.ground) metaItems.push({ k: L().modalVenue, v: raw.ground });
    const metaHtml = metaItems.length ? `
        <div class="match-meta-grid">
            ${metaItems.map(it => `<div class="match-meta-item"><span class="match-meta-k">${it.k}</span><span class="match-meta-v">${it.v}</span></div>`).join("")}
        </div>` : "";

    // --- Goals
    let goalsHtml = "";
    if (hasResult) {
        const formatGoals = (arr) => arr.length
            ? `<ul class="match-goal-list">${arr.map(goalLine).join("")}</ul>`
            : `<div class="match-no-goals">—</div>`;
        goalsHtml = `
            <div class="match-section-title">${L().modalGoals}</div>
            <div class="match-goals-grid">
                <div class="match-goal-col">
                    <div class="match-goal-team">${teamFlag(t1)} ${dispTeam(t1)}</div>
                    ${formatGoals(raw.goals1 || [])}
                </div>
                <div class="match-goal-col">
                    <div class="match-goal-team">${teamFlag(t2)} ${dispTeam(t2)}</div>
                    ${formatGoals(raw.goals2 || [])}
                </div>
            </div>
        `;
    } else {
        goalsHtml = `<div class="match-not-played">${L().modalNotPlayed}</div>`;
    }

    // --- Team links
    const linkBtn = (team) => team
        ? `<button class="match-team-link" onclick="openTeam('${team.replace(/'/g, "\\'")}')">
                ${teamFlag(team)} ${L().modalViewTeam(dispTeam(team))}
            </button>`
        : "";
    const linksHtml = (t1 || t2) ? `
        <div class="match-links">
            ${linkBtn(t1)}
            ${linkBtn(t2)}
        </div>
    ` : "";

    document.getElementById("modalBody").innerHTML = `
        ${scoreboard}
        ${metaHtml}
        ${goalsHtml}
        ${linksHtml}
    `;

    document.getElementById("teamModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/* Per-user collapsed-round state (persists in localStorage) */
const KO_COLLAPSE_KEY = "wc-ko-collapsed";
function readCollapsedState() {
    try {
        const raw = localStorage.getItem(KO_COLLAPSE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function writeCollapsedState(state) {
    try { localStorage.setItem(KO_COLLAPSE_KEY, JSON.stringify(state)); } catch {}
}
function toggleRound(roundName) {
    const state = readCollapsedState();
    state[roundName] = !state[roundName];
    writeCollapsedState(state);
    // Re-render the bracket so the column collapses and lines redraw cleanly
    renderKnockout();
}

/* Find which match-number(s) feed into a given match by parsing W##/L## placeholders */
function feederNums(m) {
    const out = [];
    [m.team1, m.team2].forEach(slot => {
        const s = String(slot || "").trim();
        const mt = s.match(/^[WL](\d+)$/i);
        if (mt) out.push(parseInt(mt[1], 10));
    });
    return out;
}

/* Draw connector lines between matched cards.
 * Called after the bracket DOM is in place (with rAF so layout has settled). */
function drawBracketLines() {
    const wrap = document.getElementById("bracketWrap");
    if (!wrap) return;
    const bracket = wrap.querySelector(".bracket");
    if (!bracket) return;

    // Remove any previous SVG
    const old = bracket.querySelector(".bracket-lines");
    if (old) old.remove();

    const cards = bracket.querySelectorAll(".ko-match[data-num]");
    const bRect = bracket.getBoundingClientRect();

    // Card-position lookup by match number (only for currently-rendered cards)
    const pos = {};
    cards.forEach(c => {
        const num = parseInt(c.getAttribute("data-num"), 10);
        const r = c.getBoundingClientRect();
        pos[num] = {
            left:   r.left   - bRect.left,
            right:  r.right  - bRect.left,
            top:    r.top    - bRect.top,
            bottom: r.bottom - bRect.top,
            midY:   (r.top + r.bottom) / 2 - bRect.top
        };
    });

    // Collapsed-column bounds keyed by round name — used when a feeder card
    // isn't rendered (its round is collapsed) so the line still terminates at
    // the right edge of the collapsed strip.
    const collapsedBounds = {};
    bracket.querySelectorAll(".bracket-round.collapsed").forEach(col => {
        const r = col.getBoundingClientRect();
        collapsedBounds[col.getAttribute("data-round")] = {
            left:  r.left  - bRect.left,
            right: r.right - bRect.left
        };
    });

    if (!cards.length && !Object.keys(collapsedBounds).length) return;

    // Map match-number → its round (for collapsed feeder lookups)
    const matchRound = {};
    (ALL_MATCHES || []).forEach(m => {
        if (m.num) matchRound[m.num] = normalizeRound(m.round);
    });

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("bracket-lines");
    svg.setAttribute("width", bracket.scrollWidth);
    svg.setAttribute("height", bracket.scrollHeight);
    svg.setAttribute("viewBox", `0 0 ${bracket.scrollWidth} ${bracket.scrollHeight}`);

    (ALL_MATCHES || []).forEach(m => {
        if (!m.num || !pos[m.num]) return;       // target card must be visible
        const target = pos[m.num];
        const feeders = feederNums(m);
        feeders.forEach(fn => {
            let x1, y1;
            if (pos[fn]) {
                x1 = pos[fn].right;
                y1 = pos[fn].midY;
            } else {
                // Feeder card isn't rendered — its round is likely collapsed.
                const fr = matchRound[fn];
                const bounds = fr && collapsedBounds[fr];
                if (!bounds) return;
                x1 = bounds.right;
                y1 = target.midY;                // straight horizontal stub
            }
            const x2 = target.left;
            const y2 = target.midY;
            const midX = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", d);
            svg.appendChild(path);
        });
    });

    bracket.appendChild(svg);
}

function renderKnockout() {
    const wrap = document.getElementById("bracketWrap");
    if (!wrap) return;

    if (!MATCHES_LOADED) {
        wrap.innerHTML = `<div class="empty-state">${L().koFetching}</div>`;
        return;
    }
    if (MATCHES_ERROR) {
        wrap.innerHTML = `<div class="empty-state">${L().loadFail(MATCHES_ERROR)}</div>`;
        return;
    }

    // Bucket all matches by normalized round
    const byRound = {};
    KO_ROUND_ORDER.forEach(r => byRound[r] = []);
    (ALL_MATCHES || []).forEach(m => {
        const r = normalizeRound(m.round);
        if (r && byRound[r]) byRound[r].push(m);
    });
    KO_ROUND_ORDER.forEach(r => {
        byRound[r].sort((a, b) => (a.date || "").localeCompare(b.date || "") || (a.time || "").localeCompare(b.time || ""));
    });

    const hasAny = KO_ROUND_ORDER.some(r => byRound[r].length > 0);
    if (!hasAny) {
        wrap.innerHTML = `<div class="empty-state">${L().koEmpty}</div>`;
        return;
    }

    // Build winners[num] / losers[num] maps so we can resolve placeholders like W73
    const winners = {}, losers = {};
    (ALL_MATCHES || []).forEach(m => {
        if (!m.num) return;
        // First resolve the actual teams (placeholders may chain across rounds)
        const t1 = resolveTeam(m.team1, winners, losers);
        const t2 = resolveTeam(m.team2, winners, losers);
        const resolved = { ...m, team1: t1, team2: t2 };
        const { winner, loser } = matchOutcome(resolved);
        if (winner) winners[m.num] = winner;
        if (loser)  losers[m.num]  = loser;
    });

    // Determine champion (from Final)
    let championName = null;
    const finals = byRound["Final"];
    if (finals && finals.length) {
        const f = finals[finals.length - 1];
        const ft1 = resolveTeam(f.team1, winners, losers);
        const ft2 = resolveTeam(f.team2, winners, losers);
        const { winner } = matchOutcome({ ...f, team1: ft1, team2: ft2 });
        championName = winner;
    }

    const roundsToShow = KO_ROUND_ORDER.filter(r => byRound[r].length > 0);

    // Helper: a round is "completed" when every match has a final result.
    const isRoundDone = (r) => byRound[r].length > 0 &&
        byRound[r].every(m => m.ft && m.ft.length === 2);

    const collapsedState = readCollapsedState();
    // Auto-collapse defaults for rounds the user hasn't explicitly toggled
    roundsToShow.forEach(r => {
        if (!(r in collapsedState) && isRoundDone(r)) collapsedState[r] = true;
    });

    const columns = roundsToShow.map(r => {
        const matches = byRound[r];
        const title = L().koRounds[r] || r;
        const collapsed = !!collapsedState[r];
        return `
            <div class="bracket-round ${collapsed ? "collapsed" : ""}" data-round="${r}">
                <button type="button" class="round-title" onclick="toggleRound('${r.replace(/'/g, "\\'")}')" aria-expanded="${!collapsed}">
                    <span class="round-chev">${collapsed ? "▸" : "▾"}</span>
                    <span>${title}</span>
                    <span class="round-count-pill">${matches.length}</span>
                </button>
                ${matches.map(m => {
                    const t1 = resolveTeam(m.team1, winners, losers);
                    const t2 = resolveTeam(m.team2, winners, losers);
                    return koMatchCard(m, t1, t2);
                }).join("")}
            </div>
        `;
    });

    if (championName) {
        columns.push(`
            <div class="bracket-round ko-final-col" data-round="__champion">
                <div class="round-title" style="cursor:default">
                    <span>${L().koWinner}</span>
                </div>
                <article class="ko-champion">
                    <div class="ko-trophy">🏆</div>
                    <span class="ko-flag-big">${teamFlag(championName)}</span>
                    <div class="ko-name winner">${dispTeam(championName)}</div>
                </article>
            </div>
        `);
    }

    wrap.innerHTML = `<div class="bracket">${columns.join("")}</div>`;

    // Wait for layout (and any font swap) before measuring positions
    requestAnimationFrame(() => requestAnimationFrame(drawBracketLines));
}

// Redraw connector lines when the viewport changes so they stay aligned
window.addEventListener("resize", () => {
    const panel = document.getElementById("panel-knockout");
    if (panel && panel.classList.contains("active")) {
        requestAnimationFrame(drawBracketLines);
    }
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});

/* ───── Live match data from openfootball ───── */
const WC26_JSON_URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

// Name aliases — openfootball -> our canonical names
const NAME_MAP = {
    "South Korea": "Korea Republic",
    "Czech Republic": "Czechia",
    "USA": "United States",
    "Cote d'Ivoire": "Ivory Coast",
    "Côte d'Ivoire": "Ivory Coast",
    "Cabo Verde": "Cape Verde",
    "IR Iran": "Iran",
    "Turkey": "Türkiye",
    "Turkiye": "Türkiye",
    "Curacao": "Curaçao",
    "Congo DR": "DR Congo",
    "Bosnia & Herzegovina": "Bosnia and Herzegovina",
    "Bosnia-Herzegovina": "Bosnia and Herzegovina"
};
const canon = name => NAME_MAP[name] || name;

let MATCHES = {};         // { teamName: [{ date, opponent, home, score, result, round, ground }, ...] }
let ALL_MATCHES = [];     // raw match list (canonicalized team names) for bracket rendering
let MATCHES_LOADED = false;
let MATCHES_ERROR = null;

async function loadMatches() {
    try {
        const res = await fetch(WC26_JSON_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const buckets = {};
        const allRaw = [];
        (data.matches || []).forEach(m => {
            const t1raw = canon(m.team1), t2raw = canon(m.team2);
            // Track every match (even unplayed) so we can render the bracket skeleton
            allRaw.push({
                num: m.num || null,
                date: m.date || "",
                time: m.time || "",
                round: m.round || "",
                group: m.group || "",
                ground: m.ground || "",
                team1: t1raw,
                team2: t2raw,
                ft: (m.score && Array.isArray(m.score.ft)) ? m.score.ft : null,
                ht: (m.score && Array.isArray(m.score.ht)) ? m.score.ht : null,
                pen: (m.score && Array.isArray(m.score.p)) ? m.score.p
                    : (m.score && Array.isArray(m.score.pen)) ? m.score.pen
                    : null,
                goals1: m.goals1 || [],
                goals2: m.goals2 || []
            });
            if (!m.score || !Array.isArray(m.score.ft)) return;
            const t1 = t1raw, t2 = t2raw;
            const [g1, g2] = m.score.ft;
            const [hg1, hg2] = (m.score.ht || [null, null]);
            const push = (team, opp, gf, ga, hgf, hga, home, ownGoals, oppGoals) => {
                const result = gf > ga ? "W" : (gf < ga ? "L" : "D");
                (buckets[team] = buckets[team] || []).push({
                    date: m.date, opponent: opp, home,
                    score: `${gf}-${ga}`,
                    htScore: (hgf !== null && hga !== null) ? `${hgf}-${hga}` : null,
                    result, round: m.round || "", ground: m.ground || "",
                    time: m.time || "", group: m.group || "",
                    ownGoals, oppGoals
                });
            };
            const goals1 = m.goals1 || [];
            const goals2 = m.goals2 || [];
            push(t1, t2, g1, g2, hg1, hg2, true,  goals1, goals2);
            push(t2, t1, g2, g1, hg2, hg1, false, goals2, goals1);
        });
        // Sort by date desc, keep last 10
        Object.keys(buckets).forEach(t => {
            buckets[t].sort((a, b) => b.date.localeCompare(a.date));
            buckets[t] = buckets[t].slice(0, 10);
        });
        MATCHES = buckets;
        ALL_MATCHES = allRaw;
        MATCHES_LOADED = true;
        // Re-render any open modal
        const open = document.getElementById("teamModal").classList.contains("open");
        if (open) {
            const titleEl = document.getElementById("modalTitle");
            const name = titleEl.getAttribute("data-team-name") || titleEl.textContent;
            openTeam(name);
        }
        // Re-render knockout if panel is open or simply prepare it
        renderKnockout();
    } catch (err) {
        MATCHES_ERROR = err.message || String(err);
        MATCHES_LOADED = true;
        console.warn("Failed to load WC2026 match data:", err);
        renderKnockout();
    }
}

/* First render */
applyLang();
applyTheme(localStorage.getItem("wc26_theme") || "light");  // re-apply to pick up localized theme label
renderTeams();
loadMatches();
