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
        monthsFull: ["January","February","March","April","May","June","July","August","September","October","November","December"]
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
        monthsFull: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
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
    // Re-render any open modal
    const modal = document.getElementById("teamModal");
    if (modal && modal.classList.contains("open")) {
        const titleEl = document.getElementById("modalTitle");
        const name = titleEl ? titleEl.getAttribute("data-team-name") : null;
        if (name) openTeam(name);
    }
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
let MATCHES_LOADED = false;
let MATCHES_ERROR = null;

async function loadMatches() {
    try {
        const res = await fetch(WC26_JSON_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const buckets = {};
        (data.matches || []).forEach(m => {
            if (!m.score || !Array.isArray(m.score.ft)) return;
            const t1 = canon(m.team1), t2 = canon(m.team2);
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
        MATCHES_LOADED = true;
        // Re-render any open modal
        const open = document.getElementById("teamModal").classList.contains("open");
        if (open) {
            const titleEl = document.getElementById("modalTitle");
            const name = titleEl.getAttribute("data-team-name") || titleEl.textContent;
            openTeam(name);
        }
    } catch (err) {
        MATCHES_ERROR = err.message || String(err);
        MATCHES_LOADED = true;
        console.warn("Failed to load WC2026 match data:", err);
    }
}

/* First render */
applyLang();
applyTheme(localStorage.getItem("wc26_theme") || "light");  // re-apply to pick up localized theme label
renderTeams();
loadMatches();
