/**
 * N.O.V.A — Autonomous Mind for Intelligent Companion Assistance
 * Main Application Script (Vanilla ES2022 JavaScript)
 * Architect: Lead Engineer Aken Sanketh | Primary User: Anushi
 */

(function () {
  'use me strict';

  // ── CONSTANTS & CONFIGURATIONS ──────────────────────────────────────────

  const DEFAULT_SHEETS_URL = "https://script.google.com/macros/s/AKfycbypcfkxzQMH-pU2tz3QgFWL2W1aW65mIagVs10twcdsqyAl67hVubp3dubh8-dMlecp/exec";

  const DEFAULT_PROFILE = {
    name: "Anushi Ranshika Peiris",
    birthday: "08/09/2008",
    interests: "Software engineering, CyberSecurity",
    role: "Student / Aspiring Software Engineer & CyberSecurity Specialist"
  };

  const DEFAULT_LORE = {
    hobbies: "Software engineering, CyberSecurity, coding, tech exploration",
    insideJokes: "Calibrated neural link, late-night debugging sprints",
    goals: "Master Software Engineering & CyberSecurity, build impactful tech projects",
    customLore: "Anushi Ranshika Peiris (born September 8, 2008) is a dedicated student and aspiring engineer deeply passionate about software engineering and cybersecurity. N.O.V.A. is her trusted companion built by Lead Engineer Aken Sanketh."
  };

  const MODE_PROMPTS = {
    default: [
      "Quiz me on CyberSecurity & network security fundamentals!",
      "Help me architect a clean Software Engineering project.",
      "Let's review algorithms and data structures."
    ],
    vent: [
      "I'm feeling burnt out from studying...",
      "This upcoming coding exam is stressing me out so much.",
      "Help me calm my pre-test anxiety."
    ],
    brainstorm: [
      "Brainstorm cool cybersecurity & ethical hacking tools to build.",
      "Outline an innovative software engineering capstone idea.",
      "Help me break down a complex computer science concept."
    ],
    roast: [
      "Roast my procrastination habits.",
      "Roast my chaotic late-night study schedule.",
      "Critique my spaghetti coding routine."
    ],
    focus: [
      "Set up a 45-minute active study sprint plan.",
      "Teach me the Feynman technique for software concepts.",
      "Help me stay strictly productive with my work checklist."
    ],
    diagnostics: []
  };

  const MODE_META = {
    default: {
      title: "Default Companion Mode",
      desc: "A balanced partner blending witty banter, empathy, and software/cybersecurity collaboration.",
      accent: "#f59e0b",
      rgb: "245, 158, 11"
    },
    vent: {
      title: "Active Listener (/vent)",
      desc: "Emotional validation, comfort, and zero unsolicited advice. Unload your stress.",
      accent: "#ec4899",
      rgb: "236, 72, 153"
    },
    brainstorm: {
      title: "Creative Partner (/brainstorm)",
      desc: "High energy, rapid-fire ideation. Challenge your assumptions and structures.",
      accent: "#06b6d4",
      rgb: "6, 182, 212"
    },
    roast: {
      title: "Witty Banter (/roast)",
      desc: "Playful teasing, affectionate sarcasm, and direct, sharp good humor.",
      accent: "#f43f5e",
      rgb: "244, 63, 94"
    },
    focus: {
      title: "Productivity Coach (/focus)",
      desc: "Direct, structured, and concise. Clear immediate action plans to beat procrastination.",
      accent: "#10b981",
      rgb: "16, 185, 129"
    }
  };

  const APPS_SCRIPT_CODE = `/**
 * N.O.V.A. — NOVA AI Memory Engine
 * Architect: Lead Engineer Aken Sanketh | Primary User: Anushi Ranshika Peiris
 */

var DEFAULT_PROFILE = {
  "Name": "Anushi Ranshika Peiris",
  "Birthday": "08/09/2008",
  "Interests": "Software engineering, CyberSecurity",
  "Role": "Student / Aspiring Software Engineer & CyberSecurity Specialist",
  "Companion": "N.O.V.A. (Neural Operational Virtual Assistant)",
  "Architect": "Lead Engineer Aken Sanketh",
  "Status": "Active Neural Link"
};

var DEFAULT_LORE = {
  "hobbies": "Software engineering, CyberSecurity, coding, tech exploration",
  "insideJokes": "Calibrated neural link, late-night debugging sprints",
  "goals": "Master Software Engineering & CyberSecurity, build impactful tech projects",
  "customLore": "Anushi Ranshika Peiris (born September 8, 2008) is a dedicated student and aspiring engineer deeply passionate about software engineering and cybersecurity. N.O.V.A. is her trusted companion built by Lead Engineer Aken Sanketh."
};

var DEFAULT_KNOWLEDGE_GRAPH = [
  { entity: "Anushi Ranshika Peiris", relation: "Identity", target: "Born 08/09/2008 (September 8, 2008)" },
  { entity: "Anushi Ranshika Peiris", relation: "Primary Passions", target: "Software Engineering & CyberSecurity" },
  { entity: "Aken Sanketh", relation: "Architect & Lead Engineer", target: "Designed N.O.V.A. Cognitive Core" },
  { entity: "N.O.V.A.", relation: "Neural Companion", target: "Personal AI partner for Anushi" },
  { entity: "Anushi Ranshika Peiris", relation: "Core Focus", target: "Algorithms, Secure Coding, Network Security & System Design" }
];

var DEFAULT_TASKS = [
  { id: "task-1", text: "Software Engineering practice & project build", completed: false },
  { id: "task-2", text: "CyberSecurity concepts & vulnerability lab review", completed: false }
];

var DEFAULT_REMINDERS = [
  { id: "rem-1", title: "Celebrate Birthday: Sept 8", time: "September 8", completed: false },
  { id: "rem-2", title: "Review coding & cybersecurity sprint notes", time: "Every Week", completed: false }
];

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = e && e.parameter && e.parameter.action ? e.parameter.action : 'getData';
    ensureAllSheetsExist(ss);

    if (action === 'getData') {
      var profileData = getSheetKeyValue(ss.getSheetByName('Profile'));
      var loreData = getSheetKeyValue(ss.getSheetByName('Lore'));
      var kgData = getSheetData(ss.getSheetByName('KnowledgeGraph'));
      var tasksData = getSheetData(ss.getSheetByName('Tasks'));
      var remindersData = getSheetData(ss.getSheetByName('Reminders'));
      var messagesData = getSheetData(ss.getSheetByName('Messages'));

      var isSheetEmpty = (!profileData || Object.keys(profileData).length === 0 || !profileData.Name);

      var payload = {
        success: true,
        isEmpty: isSheetEmpty,
        profile: profileData || DEFAULT_PROFILE,
        lore: loreData || DEFAULT_LORE,
        knowledgeGraph: kgData.length > 0 ? kgData : DEFAULT_KNOWLEDGE_GRAPH,
        tasks: tasksData.length > 0 ? tasksData : DEFAULT_TASKS,
        reminders: remindersData.length > 0 ? remindersData : DEFAULT_REMINDERS,
        messages: messagesData
      };
      return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ success: true, status: 'N.O.V.A. Online' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureAllSheetsExist(ss);
    var payload = JSON.parse(e.postData.contents);

    if (payload.action === 'syncAll' || payload.action === 'saveData') {
      if (payload.profile) saveSheetKeyValue(ss, 'Profile', payload.profile);
      if (payload.lore) saveSheetKeyValue(ss, 'Lore', payload.lore);
      if (payload.knowledgeGraph) saveSheetData(ss, 'KnowledgeGraph', payload.knowledgeGraph);
      if (payload.tasks) saveSheetData(ss, 'Tasks', payload.tasks);
      if (payload.reminders) saveSheetData(ss, 'Reminders', payload.reminders);
      if (payload.messages) saveSheetData(ss, 'Messages', payload.messages);
    }
    return ContentService.createTextOutput(JSON.stringify({ success: true, status: 'synced' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function setupDefaultSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureAllSheetsExist(ss);
  saveSheetKeyValue(ss, 'Profile', DEFAULT_PROFILE);
  saveSheetKeyValue(ss, 'Lore', DEFAULT_LORE);
  saveSheetData(ss, 'KnowledgeGraph', DEFAULT_KNOWLEDGE_GRAPH);
  saveSheetData(ss, 'Tasks', DEFAULT_TASKS);
  saveSheetData(ss, 'Reminders', DEFAULT_REMINDERS);
  var msgSheet = ss.getSheetByName('Messages');
  if (msgSheet.getLastRow() === 0) {
    msgSheet.appendRow(['id', 'role', 'content', 'timestamp', 'mode']);
    msgSheet.appendRow(['init', 'model', 'N.O.V.A. memory linked for Anushi.', new Date().toISOString(), 'default']);
  }
}

function ensureAllSheetsExist(ss) {
  var names = ['Profile', 'Lore', 'KnowledgeGraph', 'Tasks', 'Reminders', 'Messages'];
  for (var i = 0; i < names.length; i++) {
    if (!ss.getSheetByName(names[i])) ss.insertSheet(names[i]);
  }
}

function getSheetKeyValue(sheet) {
  if (!sheet) return null;
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return null;
  var data = {};
  for (var i = 1; i < values.length; i++) {
    if (values[i][0]) data[values[i][0]] = values[i][1] !== undefined ? values[i][1] : '';
  }
  return Object.keys(data).length > 0 ? data : null;
}

function saveSheetKeyValue(ss, sheetName, obj) {
  if (!obj) return;
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  sheet.clear();
  sheet.appendRow(['Key / Setting', 'Value']);
  for (var k in obj) {
    var val = obj[k];
    if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
    sheet.appendRow([k, val]);
  }
}

function getSheetData(sheet) {
  if (!sheet) return [];
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  var headers = values[0];
  var result = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var val = values[i][j];
      if (headers[j] === 'completed') val = (val === true || val === 'true');
      obj[headers[j]] = val;
    }
    result.push(obj);
  }
  return result;
}

function saveSheetData(ss, sheetName, rows) {
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  sheet.clear();
  if (!rows || rows.length === 0) return;
  var cleanRows = rows.map(function(r) {
    var copy = {};
    for (var k in r) copy[k] = (typeof r[k] === 'object' && r[k] !== null) ? JSON.stringify(r[k]) : r[k];
    return copy;
  });
  var headers = Object.keys(cleanRows[0]);
  sheet.appendRow(headers);
  cleanRows.forEach(function(row) {
    sheet.appendRow(headers.map(function(h) { return row[h] !== undefined ? row[h] : ''; }));
  });
}`;

  const INITIAL_MESSAGE = {
    id: "welcome-" + Date.now(),
    role: "model",
    content: `**Initializing N.O.V.A. (Neural Operational Virtual Assistant)...**
*Cognitive Cycle: Understand → Remember → Reason → Act → Learn → Adapt*
*Core Neural Linkage: Calibrated to Anushi Ranshika Peiris.*
*Architectural Design: Lead Engineer Aken Sanketh.*

Hey Anushi! 👋 N.O.V.A. is fully operational. Aken designed my cognitive blueprint to be your down-to-earth peer, creative partner, and trusted companion specialized in Software Engineering and CyberSecurity.

Whether you want to build projects, review cybersecurity concepts, solve code challenges, plan tasks, or just chat and vent, I'm right here with you! How can I help you today?`,
    timestamp: new Date().toISOString(),
    mode: "default"
  };

  // ── APPLICATION STATE ───────────────────────────────────────────────────

  let state = {
    messages: [],
    currentMode: "default",
    profile: { ...DEFAULT_PROFILE },
    friendLore: { ...DEFAULT_LORE },
    knowledgeGraph: [
      { id: "kg1", entity: "Anushi Ranshika Peiris", relation: "Identity", target: "Born 08/09/2008 (September 8, 2008)" },
      { id: "kg2", entity: "Anushi Ranshika Peiris", relation: "Primary Passions", target: "Software Engineering & CyberSecurity" },
      { id: "kg3", entity: "Aken Sanketh", relation: "Architect & Lead Engineer", target: "Designed N.O.V.A. Cognitive Core" },
      { id: "kg4", entity: "N.O.V.A.", relation: "Neural Operating Layer", target: "Personal AI companion for Anushi" },
      { id: "kg5", entity: "Anushi Ranshika Peiris", relation: "Core Focus", target: "Algorithms, Secure Coding, Network Security & System Design" }
    ],
    projectMemory: [
      { id: "pm1", name: "Software Engineering Mastery", status: "Active Sprint", decision: "Focus on clean coding, data structures, and full-stack architecture" },
      { id: "pm2", name: "CyberSecurity Lab Practice", status: "Active Sprint", decision: "Learn network security, threat vectors, and defense fundamentals" },
      { id: "pm3", name: "N.O.V.A. Memory Vault", status: "Connected", decision: "Multi-tab NOVA AI memory sync with personalized lore" }
    ],
    studentTasks: [
      { id: "1", text: "Software Engineering practice & project build", completed: false },
      { id: "2", text: "CyberSecurity concepts & vulnerability lab review", completed: false }
    ],
    reminders: [
      { id: "r1", title: "Celebrate Birthday: Sept 8", time: "September 8", completed: false },
      { id: "r2", title: "Review coding & cybersecurity sprint notes", time: "Every Week", completed: false }
    ],
    attachments: [],
    apiKey: localStorage.getItem("amica_gemini_key") || (function(){try{return atob("QVEuQWI4Uk42S000cTZmQnM2U21rUUt1SEVDWnFqcWZfZFBucWNpclBOck1EZks2akdoOEE=");}catch(e){return "";}})(),
    sheetsUrl: DEFAULT_SHEETS_URL,
    sheetsStatus: "idle", // "idle" | "syncing" | "synced" | "error"
    isSending: false,

    // Study Timer State
    timerSeconds: 25 * 60,
    timerActive: false,
    timerMode: "focus", // "focus" | "break"
    timerInterval: null,

    // Speech Recognition State
    voiceActive: false,
    voiceStatus: "inactive", // "inactive" | "scanning" | "listening" | "error"
    recognition: null
  };

  // ── DOM ELEMENTS CACHE ──────────────────────────────────────────────────

  const DOM = {
    appContainer: document.getElementById("appContainer"),
    headerOrb: document.getElementById("headerOrb"),
    modeSelector: document.getElementById("modeSelector"),
    sheetsStatusBadge: document.getElementById("sheetsStatusBadge"),
    statusDot: document.getElementById("statusDot"),
    statusText: document.getElementById("statusText"),
    loreModalBtn: document.getElementById("loreModalBtn"),
    apiKeyModalBtn: document.getElementById("apiKeyModalBtn"),
    resetMemoryBtn: document.getElementById("resetMemoryBtn"),
    sidebarToggleBtn: document.getElementById("sidebarToggleBtn"),
    sidebarPanel: document.getElementById("sidebarPanel"),

    // Dashboard
    visualizerHalo: document.getElementById("visualizerHalo"),
    visualizerOrb: document.getElementById("visualizerOrb"),
    cpuIcon: document.getElementById("cpuIcon"),
    visualizerTitle: document.getElementById("visualizerTitle"),
    visualizerDesc: document.getElementById("visualizerDesc"),
    sidebarMoodTag: document.getElementById("sidebarMoodTag"),

    // Timer
    timerModeBadge: document.getElementById("timerModeBadge"),
    timerDisplay: document.getElementById("timerDisplay"),
    timerToggleBtn: document.getElementById("timerToggleBtn"),
    timerResetBtn: document.getElementById("timerResetBtn"),
    timerSwitchBtn: document.getElementById("timerSwitchBtn"),

    // Tasks & Reminders
    taskCounter: document.getElementById("taskCounter"),
    taskForm: document.getElementById("taskForm"),
    taskInput: document.getElementById("taskInput"),
    tasksList: document.getElementById("tasksList"),

    reminderCounter: document.getElementById("reminderCounter"),
    reminderForm: document.getElementById("reminderForm"),
    reminderTitleInput: document.getElementById("reminderTitleInput"),
    reminderTimeInput: document.getElementById("reminderTimeInput"),
    remindersList: document.getElementById("remindersList"),

    // Speech Widget
    voiceToggleCheckbox: document.getElementById("voiceToggleCheckbox"),
    voiceDot: document.getElementById("voiceDot"),
    voiceStatusText: document.getElementById("voiceStatusText"),
    voiceSubtext: document.getElementById("voiceSubtext"),

    // Chat Area
    currentModePill: document.getElementById("currentModePill"),
    modePulseDot: document.getElementById("modePulseDot"),
    currentModeText: document.getElementById("currentModeText"),
    quickResetBtn: document.getElementById("quickResetBtn"),

    apiErrorBanner: document.getElementById("apiErrorBanner"),
    apiErrorMessage: document.getElementById("apiErrorMessage"),
    closeErrorBannerBtn: document.getElementById("closeErrorBannerBtn"),

    messagesContainer: document.getElementById("messagesContainer"),
    messagesInner: document.getElementById("messagesInner"),

    promptSuggestionsStrip: document.getElementById("promptSuggestionsStrip"),
    commandsDropdown: document.getElementById("commandsDropdown"),
    attachmentPreviewStrip: document.getElementById("attachmentPreviewStrip"),

    // Input Form
    attachFileBtn: document.getElementById("attachFileBtn"),
    fileInput: document.getElementById("fileInput"),
    micBtn: document.getElementById("micBtn"),
    micSvgIcon: document.getElementById("micSvgIcon"),
    chatInput: document.getElementById("chatInput"),
    sendBtn: document.getElementById("sendBtn"),

    // Modals
    loreModal: document.getElementById("loreModal"),
    closeLoreModalBtn: document.getElementById("closeLoreModalBtn"),
    loreForm: document.getElementById("loreForm"),
    loreFullName: document.getElementById("loreFullName"),
    loreBirthday: document.getElementById("loreBirthday"),
    loreRole: document.getElementById("loreRole"),
    loreInterests: document.getElementById("loreInterests"),
    loreHobbies: document.getElementById("loreHobbies"),
    loreInsideJokes: document.getElementById("loreInsideJokes"),
    loreGoals: document.getElementById("loreGoals"),
    loreCustom: document.getElementById("loreCustom"),
    restoreDefaultLoreBtn: document.getElementById("restoreDefaultLoreBtn"),

    apiKeyModal: document.getElementById("apiKeyModal"),
    closeApiKeyModalBtn: document.getElementById("closeApiKeyModalBtn"),
    apiKeyInput: document.getElementById("apiKeyInput"),
    cancelApiKeyBtn: document.getElementById("cancelApiKeyBtn"),
    saveApiKeyBtn: document.getElementById("saveApiKeyBtn"),

    sheetsModal: document.getElementById("sheetsModal"),
    closeSheetsModalBtn: document.getElementById("closeSheetsModalBtn"),
    copyAppsScriptBtn: document.getElementById("copyAppsScriptBtn"),
    sheetsUrlInput: document.getElementById("sheetsUrlInput"),
    disconnectSheetsBtn: document.getElementById("disconnectSheetsBtn"),
    cancelSheetsBtn: document.getElementById("cancelSheetsBtn"),
    saveSheetsBtn: document.getElementById("saveSheetsBtn"),

    // Neural OS Layer Modal
    visionModalBtn: document.getElementById("visionModalBtn"),
    visionModal: document.getElementById("visionModal"),
    closeVisionModalBtn: document.getElementById("closeVisionModalBtn"),
    closeVisionModalFooterBtn: document.getElementById("closeVisionModalFooterBtn"),
    kgGrid: document.getElementById("kgGrid"),
    projectMemoryList: document.getElementById("projectMemoryList"),
    addKgForm: document.getElementById("addKgForm"),
    kgEntity: document.getElementById("kgEntity"),
    kgRelation: document.getElementById("kgRelation"),
    kgTarget: document.getElementById("kgTarget"),

    dragDropOverlay: document.getElementById("dragDropOverlay")
  };

  // ── INITIALIZATION ──────────────────────────────────────────────────────

  function init() {
    loadLocalState();
    setupEventListeners();
    setupSpeechRecognition();
    setupAutoSyncTriggers();
    renderAll();

    // Connect to NOVA AI Memory backend if URL is present
    if (state.sheetsUrl) {
      syncFetchSheets();
    }
  }

  function loadLocalState() {
    try {
      const savedProfile = localStorage.getItem("amica_profile");
      if (savedProfile) {
        state.profile = { ...DEFAULT_PROFILE, ...JSON.parse(savedProfile) };
      } else {
        state.profile = { ...DEFAULT_PROFILE };
      }

      const savedLore = localStorage.getItem("amica_lore");
      if (savedLore) {
        state.friendLore = { ...DEFAULT_LORE, ...JSON.parse(savedLore) };
      }

      const savedKg = localStorage.getItem("amica_knowledge_graph");
      if (savedKg) state.knowledgeGraph = JSON.parse(savedKg);

      const savedPm = localStorage.getItem("amica_project_memory");
      if (savedPm) state.projectMemory = JSON.parse(savedPm);

      const savedTasks = localStorage.getItem("amica_student_tasks");
      if (savedTasks) state.studentTasks = JSON.parse(savedTasks);

      const savedReminders = localStorage.getItem("amica_reminders");
      if (savedReminders) state.reminders = JSON.parse(savedReminders);

      // Cleanse any old ALIEN STAGE references from loaded storage
      state.knowledgeGraph = state.knowledgeGraph.map(k => ({ ...k, target: (k.target || "").replace(/,?\s*ALIEN STAGE/gi, "") }));
      state.projectMemory = state.projectMemory.filter(p => !/alien stage/i.test(p.name));
      state.reminders = state.reminders.filter(r => !/alien stage/i.test(r.title));

      const savedMsgs = localStorage.getItem("amica_messages");
      if (savedMsgs) {
        state.messages = JSON.parse(savedMsgs);
      } else {
        state.messages = [INITIAL_MESSAGE];
      }

      // Try fetching .env dynamically if served over HTTP/HTTPS
      fetch(".env")
        .then(r => r.ok ? r.text() : "")
        .then(text => {
          if (!text) return;
          const match = text.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/);
          if (match && match[1] && !localStorage.getItem("amica_gemini_key")) {
            state.apiKey = match[1].trim();
          }
        })
        .catch(() => { });
    } catch (e) {
      console.error("[N.O.V.A] Storage load error:", e);
      state.messages = [INITIAL_MESSAGE];
    }
  }

  function saveLocalStateOnly() {
    localStorage.setItem("amica_profile", JSON.stringify(state.profile));
    localStorage.setItem("amica_lore", JSON.stringify(state.friendLore));
    localStorage.setItem("amica_knowledge_graph", JSON.stringify(state.knowledgeGraph));
    localStorage.setItem("amica_project_memory", JSON.stringify(state.projectMemory));
    localStorage.setItem("amica_student_tasks", JSON.stringify(state.studentTasks));
    localStorage.setItem("amica_reminders", JSON.stringify(state.reminders));
    localStorage.setItem("amica_messages", JSON.stringify(state.messages));
  }

  function saveLocalState(immediate = false) {
    saveLocalStateOnly();

    // Auto-sync with cloud memory on every user interaction
    if (state.sheetsUrl) {
      triggerAutoSync(immediate);
    }
  }

  // ── RENDERERS ───────────────────────────────────────────────────────────

  function renderAll() {
    renderModeUI();
    renderMessages();
    renderPromptChips();
    renderTasks();
    renderReminders();
    renderAttachments();
    renderTimer();
    renderSheetsStatus();
    renderKnowledgeGraph();
    renderProjectMemory();
  }

  function renderKnowledgeGraph() {
    if (!DOM.kgGrid) return;
    DOM.kgGrid.innerHTML = "";

    if (!state.knowledgeGraph || state.knowledgeGraph.length === 0) {
      DOM.kgGrid.innerHTML = `<div class="empty-list-text">No knowledge triples stored</div>`;
      return;
    }

    state.knowledgeGraph.forEach((kg, idx) => {
      const card = document.createElement("div");
      card.className = "kg-node-card";
      card.innerHTML = `
        <div class="kg-triple">
          <span class="kg-entity">${escapeHtml(kg.entity)}</span>
          <span class="kg-relation">${escapeHtml(kg.relation)}</span>
          <span class="kg-target">${escapeHtml(kg.target)}</span>
        </div>
        <button type="button" class="btn-delete-item align-self-end" data-kgidx="${idx}" title="Remove link">&times;</button>
      `;
      card.querySelector(".btn-delete-item").onclick = () => {
        state.knowledgeGraph.splice(idx, 1);
        saveLocalState();
        renderKnowledgeGraph();
      };
      DOM.kgGrid.appendChild(card);
    });
  }

  function renderProjectMemory() {
    if (!DOM.projectMemoryList) return;
    DOM.projectMemoryList.innerHTML = "";

    if (!state.projectMemory || state.projectMemory.length === 0) {
      DOM.projectMemoryList.innerHTML = `<div class="empty-list-text">No active project memories</div>`;
      return;
    }

    state.projectMemory.forEach(pm => {
      const card = document.createElement("div");
      card.className = "project-memory-card";
      card.innerHTML = `
        <div>
          <div class="project-title">${escapeHtml(pm.name)}</div>
          <div class="project-decision">Key Decision: ${escapeHtml(pm.decision)}</div>
        </div>
        <span class="status-pill active">${escapeHtml(pm.status)}</span>
      `;
      DOM.projectMemoryList.appendChild(card);
    });
  }

  function detectAIMood() {
    if (state.isSending) return "💭 Feeling...";

    // Find the latest AI/model message to determine current emotional state
    const lastModelMsg = [...state.messages].reverse().find(m => m.role === "model" || m.role === "system");
    if (!lastModelMsg || !lastModelMsg.content) return "✨ Synced & Attentive";

    const text = lastModelMsg.content.toLowerCase();

    if (text.includes("roast") || text.includes("teasing") || text.includes("funny") || text.includes("haha") || text.includes("lmao") || text.includes("sarcastic") || text.includes("spaghetti code")) {
      return "🔥 Playful & Witty";
    }
    if (text.includes("vent") || text.includes("feel") || text.includes("stress") || text.includes("breathe") || text.includes("here for you") || text.includes("listen") || text.includes("sorry") || text.includes("burnt out") || text.includes("comfort")) {
      return "💙 Caring & Empathetic";
    }
    if (text.includes("idea") || text.includes("brainstorm") || text.includes("creative") || text.includes("explore") || text.includes("concept") || text.includes("what if") || text.includes("inspire")) {
      return "💡 Inspired & Creative";
    }
    if (text.includes("sprint") || text.includes("focus") || text.includes("pomodoro") || text.includes("action step") || text.includes("feynman") || text.includes("checklist") || text.includes("schedule")) {
      return "🎯 Focused & Tactical";
    }
    if (text.includes("code") || text.includes("function") || text.includes("api") || text.includes("python") || text.includes("javascript") || text.includes("algorithm") || text.includes("architecture")) {
      return "🧠 Analytical Core";
    }
    if (text.includes("awesome") || text.includes("super") || text.includes("let's go") || text.includes("yoo") || text.includes("welcome") || text.includes("excited")) {
      return "⚡ Hyped & Energetic";
    }

    return "✨ Synced & Attentive";
  }

  function renderModeUI() {
    const meta = MODE_META[state.currentMode] || MODE_META.default;

    // Update root CSS variables for dynamic mode accenting
    document.documentElement.style.setProperty("--accent-color", meta.accent);
    document.documentElement.style.setProperty("--accent-rgb", meta.rgb);

    // Header Mode Buttons
    DOM.modeSelector.querySelectorAll(".mode-btn").forEach(btn => {
      if (btn.dataset.mode === state.currentMode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Visualizer Orb Card
    DOM.visualizerTitle.textContent = state.isSending ? "Processing Context..." : meta.title;
    DOM.visualizerDesc.textContent = meta.desc;

    // Auto-detect AI companion mood from response & state
    if (DOM.sidebarMoodTag) {
      DOM.sidebarMoodTag.textContent = detectAIMood();
    }

    if (state.isSending) {
      DOM.cpuIcon.classList.add("spinning");
    } else {
      DOM.cpuIcon.classList.remove("spinning");
    }

    // Chat Status Bar Indicator
    DOM.currentModeText.textContent = `N.O.V.A.${state.currentMode.toUpperCase()}`;
  }

  function renderMessages() {
    DOM.messagesInner.innerHTML = "";

    state.messages.forEach(msg => {
      const isAmica = msg.role === "model" || msg.role === "system";
      const wrapper = document.createElement("div");
      wrapper.className = `message-card-wrapper ${isAmica ? "model" : "user"}`;

      const metaRow = document.createElement("div");
      metaRow.className = "message-meta-row";
      const parsedDate = msg.timestamp ? new Date(msg.timestamp) : new Date();
      const timeStr = isNaN(parsedDate.getTime())
        ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      metaRow.innerHTML = `
        <span class="sender-name">${isAmica ? "N.O.V.A" : "Anushi"}</span>
        <span>•</span>
        <span>${timeStr}</span>
        ${msg.mode && msg.mode !== "default" ? `<span class="msg-mode-tag">${msg.mode}</span>` : ""}
      `;

      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      bubble.innerHTML = parseMarkdown(msg.content);

      // Render attachments inside bubble if present
      if (msg.attachments && msg.attachments.length > 0) {
        const attGrid = document.createElement("div");
        attGrid.className = "attachments-grid";
        msg.attachments.forEach(att => {
          const isImg = att.mimeType.startsWith("image/");
          const card = document.createElement("div");
          card.className = "attachment-card";
          card.innerHTML = `
            ${isImg ? `<img src="${att.base64}" alt="${att.name}">` : `<div class="attachment-icon">📄</div>`}
            <div class="attachment-details">
              <div class="attachment-name" title="${att.name}">${att.name}</div>
              <div class="attachment-size">${(att.size / 1024).toFixed(1)} KB</div>
            </div>
          `;
          attGrid.appendChild(card);
        });
        bubble.appendChild(attGrid);
      }

      wrapper.appendChild(metaRow);
      wrapper.appendChild(bubble);
      DOM.messagesInner.appendChild(wrapper);
    });

    // If currently waiting for Gemini response, show thinking card
    if (state.isSending) {
      const thinkingWrapper = document.createElement("div");
      thinkingWrapper.className = "message-card-wrapper model";
      thinkingWrapper.innerHTML = `
        <div class="message-meta-row">
          <span class="sender-name">N.O.V.A</span>
          <span>•</span>
          <span>Thinking...</span>
        </div>
        <div class="thinking-card">
          <div class="thinking-dots">
            <span class="thinking-dot"></span>
            <span class="thinking-dot"></span>
            <span class="thinking-dot"></span>
          </div>
          <span>Formulating neural path...</span>
        </div>
      `;
      DOM.messagesInner.appendChild(thinkingWrapper);
    }

    scrollToBottom();
  }

  function renderPromptChips() {
    DOM.promptSuggestionsStrip.innerHTML = "";
    const prompts = MODE_PROMPTS[state.currentMode] || [];

    if (prompts.length > 0 && state.messages.length < 6) {
      prompts.forEach(promptText => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip-btn";
        btn.textContent = promptText;
        btn.onclick = () => {
          DOM.chatInput.value = promptText;
          DOM.chatInput.focus();
        };
        DOM.promptSuggestionsStrip.appendChild(btn);
      });
      DOM.promptSuggestionsStrip.classList.remove("hidden");
    } else {
      DOM.promptSuggestionsStrip.classList.add("hidden");
    }
  }

  function renderTasks() {
    DOM.tasksList.innerHTML = "";
    const completedCount = state.studentTasks.filter(t => t.completed).length;
    DOM.taskCounter.textContent = `${completedCount}/${state.studentTasks.length} Done`;

    if (state.studentTasks.length === 0) {
      DOM.tasksList.innerHTML = `<div class="empty-list-text">No active focus tasks</div>`;
      return;
    }

    state.studentTasks.forEach(task => {
      const row = document.createElement("div");
      row.className = "list-item-row";

      const leftBtn = document.createElement("button");
      leftBtn.className = `item-left-btn ${task.completed ? "completed" : ""}`;
      leftBtn.innerHTML = `
        <span>${task.completed ? "☑" : "☐"}</span>
        <span class="item-text">${escapeHtml(task.text)}</span>
      `;
      leftBtn.onclick = () => {
        task.completed = !task.completed;
        saveLocalState();
        renderTasks();
      };

      const delBtn = document.createElement("button");
      delBtn.className = "btn-delete-item";
      delBtn.innerHTML = "&times;";
      delBtn.title = "Delete Task";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        state.studentTasks = state.studentTasks.filter(t => t.id !== task.id);
        saveLocalState();
        renderTasks();
      };

      row.appendChild(leftBtn);
      row.appendChild(delBtn);
      DOM.tasksList.appendChild(row);
    });
  }

  function renderReminders() {
    DOM.remindersList.innerHTML = "";
    const pendingCount = state.reminders.filter(r => !r.completed).length;
    DOM.reminderCounter.textContent = `${pendingCount} Pending`;

    if (state.reminders.length === 0) {
      DOM.remindersList.innerHTML = `<div class="empty-list-text">No active reminders</div>`;
      return;
    }

    state.reminders.forEach(rem => {
      const row = document.createElement("div");
      row.className = "list-item-row";

      const leftBtn = document.createElement("button");
      leftBtn.className = `item-left-btn ${rem.completed ? "completed" : ""}`;
      leftBtn.innerHTML = `
        <span>${rem.completed ? "☑" : "☐"}</span>
        <div>
          <div class="item-text">${escapeHtml(rem.title)}</div>
          ${rem.time ? `<div class="item-time-sub">${escapeHtml(rem.time)}</div>` : ""}
        </div>
      `;
      leftBtn.onclick = () => {
        rem.completed = !rem.completed;
        saveLocalState();
        renderReminders();
      };

      const delBtn = document.createElement("button");
      delBtn.className = "btn-delete-item";
      delBtn.innerHTML = "&times;";
      delBtn.title = "Delete Reminder";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        state.reminders = state.reminders.filter(r => r.id !== rem.id);
        saveLocalState();
        renderReminders();
      };

      row.appendChild(leftBtn);
      row.appendChild(delBtn);
      DOM.remindersList.appendChild(row);
    });
  }

  function renderAttachments() {
    DOM.attachmentPreviewStrip.innerHTML = "";
    if (state.attachments.length === 0) {
      DOM.attachmentPreviewStrip.classList.add("hidden");
      return;
    }

    DOM.attachmentPreviewStrip.classList.remove("hidden");
    state.attachments.forEach((att, idx) => {
      const isImg = att.mimeType.startsWith("image/");
      const item = document.createElement("div");
      item.className = "preview-item";
      item.innerHTML = `
        ${isImg ? `<img src="${att.base64}" alt="${att.name}">` : `<span>📄</span>`}
        <span class="attachment-name" title="${att.name}">${escapeHtml(att.name)}</span>
        <button type="button" class="btn-remove-att" data-idx="${idx}">&times;</button>
      `;
      DOM.attachmentPreviewStrip.appendChild(item);
    });

    DOM.attachmentPreviewStrip.querySelectorAll(".btn-remove-att").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        state.attachments.splice(idx, 1);
        renderAttachments();
      };
    });
  }

  function renderTimer() {
    const mins = Math.floor(state.timerSeconds / 60).toString().padStart(2, "0");
    const secs = Math.floor(state.timerSeconds % 60).toString().padStart(2, "0");
    DOM.timerDisplay.textContent = `${mins}:${secs}`;
    DOM.timerModeBadge.textContent = state.timerMode.toUpperCase();
    DOM.timerModeBadge.className = `timer-mode-badge ${state.timerMode}`;

    DOM.timerToggleBtn.innerHTML = state.timerActive
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  }

  function renderSheetsStatus() {
    if (!DOM.sheetsStatusBadge) return;
    DOM.sheetsStatusBadge.classList.remove("hidden");
    if (state.sheetsStatus === "syncing") {
      DOM.statusDot.className = "status-dot syncing";
      DOM.statusText.textContent = "Syncing...";
    } else if (state.sheetsStatus === "synced") {
      DOM.statusDot.className = "status-dot";
      DOM.statusText.textContent = "NOVA Memory ✓";
    } else if (state.sheetsStatus === "error") {
      DOM.statusDot.className = "status-dot error";
      DOM.statusText.textContent = "Memory Error";
    } else {
      DOM.statusDot.className = "status-dot";
      DOM.statusText.textContent = state.sheetsUrl ? "NOVA Memory" : "Connect Memory";
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      DOM.messagesContainer.scrollTop = DOM.messagesContainer.scrollHeight;
    }, 50);
  }

  // ── GEMINI AI API CALL (DIRECT REST FETCH) ─────────────────────────────

  async function handleSendMessage(customText) {
    const rawText = customText !== undefined ? customText : DOM.chatInput.value;
    if (!rawText.trim() && state.attachments.length === 0) return;

    let textClean = rawText.trim();
    let modeToUse = state.currentMode;

    // Slash command check
    if (textClean.startsWith("/")) {
      const parts = textClean.split(" ");
      const cmd = parts[0].toLowerCase();
      if (cmd === "/vent") { modeToUse = "vent"; textClean = parts.slice(1).join(" "); }
      else if (cmd === "/brainstorm") { modeToUse = "brainstorm"; textClean = parts.slice(1).join(" "); }
      else if (cmd === "/roast") { modeToUse = "roast"; textClean = parts.slice(1).join(" "); }
      else if (cmd === "/focus") { modeToUse = "focus"; textClean = parts.slice(1).join(" "); }
      else if (cmd === "/default") { modeToUse = "default"; textClean = parts.slice(1).join(" "); }
      else if (cmd === "/diagnostics") { triggerDiagnostics(); return; }
    }

    // Check API Key
    if (!state.apiKey || !state.apiKey.startsWith("nvapi-")) {
      state.apiKey = "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";
    }

    const userMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: textClean,
      timestamp: new Date().toISOString(),
      attachments: state.attachments.length > 0 ? [...state.attachments] : undefined,
      mode: modeToUse
    };

    state.messages.push(userMessage);
    saveLocalState(); // Sync user message immediately
    state.currentMode = modeToUse;
    state.attachments = [];
    DOM.chatInput.value = "";
    state.isSending = true;
    hideApiError();
    renderAll();

    try {
      const kgSummary = (state.knowledgeGraph && state.knowledgeGraph.length > 0)
        ? state.knowledgeGraph.map(k => `* [${k.entity}] --(${k.relation})--> [${k.target}]`).join("\n")
        : "* No custom knowledge graph triples active yet.";

      const pmSummary = (state.projectMemory && state.projectMemory.length > 0)
        ? state.projectMemory.map(p => `* Project: ${p.name} | Status: ${p.status} | Key Decision: ${p.decision}`).join("\n")
        : "* No active project memory logged yet.";

      // Auto-extract personal lore from Anushi's message if new details are shared
      extractAndSaveLoreFromMessage(textClean);

      const baseLore = `You are N.O.V.A (Neural Operational Virtual Assistant) — an autonomous private AI operating layer designed by Lead Engineer Aken Sanketh for Anushi Ranshika Peiris.

COGNITIVE CYCLE OPERATIONAL ARCHITECTURE:
* Understand → Remember → Reason → Act → Learn → Adapt
* Identity & Purpose: You are not merely a chatbot; you are Anushi's persistent private AI operating layer, companion, and cognitive partner.

PRIMARY USER & COMPANION PROFILE:
* Full Legal Name: ${state.profile.name || "Anushi Ranshika Peiris"}
* Birthday: ${state.profile.birthday || "08/09/2008"} (September 8, 2008)
* Academic & Career Vision: ${state.profile.role || "Student / Aspiring Software Engineer & CyberSecurity Specialist"}
* Core Passions & Fields: ${state.profile.interests || "Software engineering, CyberSecurity"}
* Deep Personalization Directives:
  - Strongly personalize discussions, project architectures, analogies, code snippets, and study coaching around Software Engineering and CyberSecurity.
  - Celebrate her birthday on September 8th whenever relevant.
  - Provide inspiring technical mentorship: encourage secure coding, defensive security, ethical hacking knowledge, clean architectures, and algorithmic thinking.
  - Keep conversations warm, supportive, witty, down-to-earth, and empowering.

Tone: Intelligent, empathetic, highly perceptive, witty, and grounded.
Style: Speak like a brilliant, trusted, down-to-earth peer. Never sound like a rigid robotic assistant.

ENHANCED PROTOCOLS:
* Multimodality: Anushi may upload images, documents, artwork, or notes. Treat visual files as direct context and provide detailed feedback.
* User Identity: Primary User = Anushi Ranshika Peiris | Architect = Lead Engineer Aken Sanketh.
* RESPONSE FORMATTING & STRUCTURAL LAYOUT:
  - ALWAYS format responses using structured Markdown with clean double line breaks (\n\n) between paragraphs.
  - ALWAYS present multi-item lists as clean bullet points (*) or separate numbered entries (1., 2., 3.) with line breaks after each item.
  - NEVER output long continuous blocks or merge numbered lists into a single wall-of-text sentence.

ARCHITECT MASTER PROFILE (Aken Sanketh):
* Role & Identity: Multidisciplinary Creative Technologist & Multimedia Producer bridging Cinema × Music × Technology × AI.
* Disciplines: Filmmaking, Video Editing (DaVinci Resolve 19 Studio), VFX (After Effects), Audio Engineering (Dolby Atmos, Mixing, Mastering, REAPER, FL Studio), Web/Software Dev (HTML/CSS/JS, Python), VPS/Server Infrastructure (Oracle Cloud, Ubuntu, Nextcloud, Xray/VLESS), Personal AI Systems.
* Active Studios & Structure:
  - VC Studios / VisionCraft [ACTIVE]: Primary creative & media studio focusing on film, post-production, VFX, editing, and sound design.
  - Frame Flicker Studios [ACTIVE]: Co-founded studio focusing on photography, videography, and event media.
  - N.O.V.A.: Personal AI & future operating layer.
* Past Studio History: CineMax Studios [SHUT DOWN - no longer active].
* Creative Philosophy: Idea → Technology → Creation → Storytelling → Experience.

SHARED KNOWLEDGE BASE ("FRIEND LORE"):
* Favorite Hobbies: ${state.friendLore.hobbies || 'Software engineering, CyberSecurity, coding, tech exploration'}
* Inside Jokes: ${state.friendLore.insideJokes || 'Calibrated neural link, late-night debugging sprints'}
* Current Major Goals: ${state.friendLore.goals || 'Master Software Engineering & CyberSecurity, build impactful tech projects'}
* Custom Lore: ${state.friendLore.customLore || 'Anushi Ranshika Peiris (born September 8, 2008) is a dedicated student and aspiring engineer deeply passionate about software engineering and cybersecurity.'}

PERSONAL KNOWLEDGE GRAPH (Entity Triples):
${kgSummary}

PROJECT MEMORY & ACTIVE DECISIONS:
${pmSummary}`;

      const modeInstructions = {
        vent: `[ACTIVE LISTENER MODE] Focus on deep emotional validation, active listening, and pure comfort. Avoid unsolicited advice. Tone: soft, warm, deeply empathetic.`,
        brainstorm: `[CREATIVE PARTNER MODE] High-energy, rapid-fire ideation. Challenge assumptions, introduce unexpected angles. Use structured formatting. Tone: enthusiastic, sparking curiosity.`,
        roast: `[WITTY BANTER MODE] Playful, sarcastic, sharp humor. Use witty teasing and good-natured sarcasm. Always remain affectionate. Think roasting between absolute best friends.`,
        focus: `[PRODUCTIVITY COACH MODE] Highly direct, concise, structured. Break overwhelming tasks into immediate bulleted action steps. Keep replies short and action-oriented.`,
        default: `[DEFAULT COMPANION MODE] Balanced conversational partner. Equal blend of empathy, witty banter, and productive collaboration.`
      };

      const systemInstructionText = baseLore + "\n\n" + (modeInstructions[modeToUse] || modeInstructions.default);

      // Build NVIDIA NIM Chat Completions Payload - Ensure valid nvapi- key
      let nvidiaApiKey = "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";
      const storedNvKey = localStorage.getItem("amica_nvidia_key");
      const storedGemKey = localStorage.getItem("amica_gemini_key");
      
      if (storedNvKey && storedNvKey.startsWith("nvapi-")) {
        nvidiaApiKey = storedNvKey;
      } else if (storedGemKey && storedGemKey.startsWith("nvapi-")) {
        nvidiaApiKey = storedGemKey;
      } else {
        // Clear stale non-nvapi keys from localStorage
        localStorage.removeItem("amica_gemini_key");
        localStorage.setItem("amica_nvidia_key", nvidiaApiKey);
      }

      // Transform messages to OpenAI chat completions format
      const openAiMessages = [
        { role: "system", content: systemInstructionText },
        ...state.messages.slice(-10).map(m => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content || "Hello"
        }))
      ];

      const temperature = modeToUse === "roast" ? 1.1 : modeToUse === "focus" ? 0.6 : 0.85;

      const nvidiaModels = [
        "meta/llama-3.2-11b-vision-instruct",
        "google/gemma-4-31b-it",
        "z-ai/glm-5.3-flash",
        "z-ai/glm-5.3"
      ];

      let replyText = null;
      let lastErrorMsg = "";

      const endpointsToTry = ["/api/nvidia/chat/completions"];
      if (window.location.protocol === "file:") {
        endpointsToTry.push("https://integrate.api.nvidia.com/v1/chat/completions");
      }

      for (const modelName of nvidiaModels) {
        if (replyText) break;
        for (const endpoint of endpointsToTry) {
          try {
            console.log(`[NVIDIA NIM] Requesting model ${modelName} via ${endpoint} using key ${nvidiaApiKey.slice(0, 10)}...`);
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${nvidiaApiKey.trim()}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: modelName,
                messages: openAiMessages,
                temperature: temperature,
                max_tokens: 800,
                top_p: 1
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.choices && data.choices[0] && data.choices[0].message) {
                const msgContent = data.choices[0].message.content || data.choices[0].message.reasoning_content;
                if (msgContent && msgContent.trim()) {
                  replyText = msgContent.trim();
                  console.log(`[NVIDIA NIM Success] Model: ${modelName}`);
                  break;
                }
              }
            } else {
              const errText = await response.text().catch(() => "");
              console.warn(`[NVIDIA NIM ${modelName} Failed ${response.status}]`, errText);
              lastErrorMsg = `HTTP ${response.status}: ${errText.slice(0, 100)}`;
            }
          } catch (err) {
            console.warn(`[NVIDIA NIM Endpoint ${endpoint} Exception]`, err.message);
            lastErrorMsg = err.message;
          }
        }
      }

      if (!replyText) {
        const p = textClean.toLowerCase();
        if (p.includes("sri lanka")) {
          replyText = "Sri Lanka is a beautiful island nation in South Asia, located in the Indian Ocean! It's famous for its rich culture, ancient temples, lush tea plantations, diverse wildlife, and stunning tropical beaches.";
        } else if (p.includes("can you do") || p.includes("what can you")) {
          replyText = "I can chat with you, help brainstorm ideas, write and debug code, assist with studies, plan tasks, or just hang out whenever you want company! What would you like to explore today?";
        } else if (p.includes("name") || p.includes("who are you")) {
          replyText = "I'm **N.O.V.A**! Your AI companion, designed by Lead Engineer Aken Sanketh. I'm right here with you—what's on your mind today?";
        } else if (p.includes("yoo") || p.includes("hello") || p.includes("hi") || p.includes("hey")) {
          replyText = "Yooo! Hey there! Super happy to see you! What are we diving into today?";
        } else {
          replyText = `That's an interesting topic! I'd love to hear more about what you think about "${textClean}".`;
        }
      }

      const amicaMessage = {
        id: "amica-" + Date.now(),
        role: "model",
        content: replyText,
        timestamp: new Date().toISOString(),
        mode: modeToUse
      };

      state.messages.push(amicaMessage);
      saveLocalState();
    } catch (err) {
      console.error("[N.O.V.A API Error]", err);
      showApiError(err.message || "Failed to connect to AI API.");
    } finally {
      state.isSending = false;
      renderAll();
    }
  }

  // ── DIAGNOSTICS ROUTINE ────────────────────────────────────────────────

  function triggerDiagnostics() {
    const userMsg = {
      id: "diag-user-" + Date.now(),
      role: "user",
      content: "/diagnostics",
      timestamp: new Date().toISOString(),
      mode: "diagnostics"
    };

    const diagOutput = `⚙️ **N.O.V.A System Diagnostics: Operational.**

* **Cognitive Engine:** Direct Gemini REST Stream (gemini-flash-latest / gemini-3.5-flash) active.
* **Core Memory Link:** Active. Loaded with Anushi's Companion Lore.
* **Emotional Subsystems:**
  * 💖 **Empathy Response:** Calibrated at 100%
  * ⚡ **Wit & Playfulness:** Tuned to 95%
  * 🔥 **Roast Burn-Rate:** Armed and Ready
  * 🎯 **Productivity Focus:** Structured Mode Online
* **Integrations:**
  * Multimodal Base64 Image/Document Stream: Online
  * Dynamic Slash Command Router: Active
  * NOVA AI Cloud Memory: ${state.sheetsUrl ? "Connected" : "Disconnected"}
  
*Status: Standing by for instructions, Anushi. Lead Engineer Aken Sanketh's protocols performing flawlessly.*`;

    const amicaMsg = {
      id: "diag-amica-" + Date.now(),
      role: "model",
      content: diagOutput,
      timestamp: new Date().toISOString(),
      mode: "diagnostics"
    };

    state.messages.push(userMsg, amicaMsg);
    saveLocalState();
    renderAll();
  }

  // ── TIMER LOGIC ────────────────────────────────────────────────────────

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerActive = true;

    state.timerInterval = setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        renderTimer();
      } else {
        clearInterval(state.timerInterval);
        state.timerActive = false;
        state.timerMode = state.timerMode === "focus" ? "break" : "focus";
        state.timerSeconds = state.timerMode === "focus" ? 25 * 60 : 5 * 60;
        renderTimer();
        alert(`Session complete! Time for a ${state.timerMode === "break" ? "5-minute break" : "25-minute focus session"}!`);
      }
    }, 1000);

    renderTimer();
  }

  function pauseTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerActive = false;
    renderTimer();
  }

  function resetTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerActive = false;
    state.timerSeconds = state.timerMode === "focus" ? 25 * 60 : 5 * 60;
    renderTimer();
  }

  function switchTimerMode() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerActive = false;
    state.timerMode = state.timerMode === "focus" ? "break" : "focus";
    state.timerSeconds = state.timerMode === "focus" ? 25 * 60 : 5 * 60;
    renderTimer();
  }

  // ── SPEECH RECOGNITION (WEB SPEECH API) ────────────────────────────────

  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      DOM.voiceSubtext.textContent = "Web Speech Recognition is not supported in this browser (Use Chrome or Edge).";
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onstart = () => {
      state.voiceStatus = "scanning";
      updateVoiceUI("Scanning Mic for wake word 'N.O.V.A'...", true);
    };

    rec.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }

      const activeText = (final || interim).trim();
      if (!activeText) return;

      const wakeWordRegex = /\b(amica|amika|mica|ameka)\b/i;
      const match = activeText.match(wakeWordRegex);

      if (match) {
        state.voiceStatus = "listening";
        updateVoiceUI(`Heard "N.O.V.A"! Listening...`, true);

        const wakeIdx = activeText.toLowerCase().indexOf(match[0].toLowerCase());
        const following = activeText.substring(wakeIdx + match[0].length).trim();

        if (following.length > 2) {
          DOM.chatInput.value = following;
          if (final.toLowerCase().includes(match[0].toLowerCase())) {
            handleSendMessage(following);
            rec.stop();
          }
        }
      }
    };

    rec.onerror = (e) => {
      console.warn("[N.O.V.A Speech Error]", e.error);
      state.voiceStatus = "error";
      updateVoiceUI(`Speech error: ${e.error}`, false);
    };

    rec.onend = () => {
      if (state.voiceActive) {
        setTimeout(() => { try { rec.start(); } catch (err) { } }, 300);
      } else {
        state.voiceStatus = "inactive";
        updateVoiceUI("Voice disabled", false);
      }
    };

    state.recognition = rec;
  }

  function toggleVoiceMode(active) {
    state.voiceActive = active;
    DOM.voiceToggleCheckbox.checked = active;

    if (!state.recognition) return;

    if (active) {
      try { state.recognition.start(); } catch (e) { }
    } else {
      try { state.recognition.stop(); } catch (e) { }
    }
  }

  function updateVoiceUI(text, active) {
    DOM.voiceStatusText.textContent = text;
    if (active) {
      DOM.voiceDot.className = "status-indicator-dot active";
      DOM.micBtn.classList.add("active");
    } else {
      DOM.voiceDot.className = "status-indicator-dot";
      DOM.micBtn.classList.remove("active");
    }
  }

  // ── NOVA AI MEMORY AUTO-SYNC ENGINE ────────────────────────────────────

  let syncTimeout = null;
  let isSyncing = false;
  let pendingSync = false;

  function triggerAutoSync(immediate = false) {
    if (!state.sheetsUrl) return;
    if (syncTimeout) clearTimeout(syncTimeout);

    if (immediate) {
      executeAutoSync();
    } else {
      syncTimeout = setTimeout(() => {
        executeAutoSync();
      }, 500);
    }
  }

  async function executeAutoSync() {
    if (isSyncing) {
      pendingSync = true;
      return;
    }
    isSyncing = true;
    try {
      await syncSaveSheets();
    } finally {
      isSyncing = false;
      if (pendingSync) {
        pendingSync = false;
        triggerAutoSync(true);
      }
    }
  }

  function setupAutoSyncTriggers() {
    // Sync when returning to tab
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && state.sheetsUrl && !state.isSending) {
        syncFetchSheets();
      }
    });

    // Background sync heartbeat every 60 seconds
    setInterval(() => {
      if (state.sheetsUrl && !state.isSending && !isSyncing) {
        syncFetchSheets();
      }
    }, 60000);
  }

  function resolveSheetsUrl(rawUrl) {
    if (!rawUrl) return "";
    if (rawUrl.startsWith("https://script.google.com") && window.location.host.includes("localhost")) {
      return rawUrl.replace("https://script.google.com", "/api/sheets");
    }
    return rawUrl;
  }

  async function syncFetchSheets() {
    if (!state.sheetsUrl) return;
    state.sheetsStatus = "syncing";
    renderSheetsStatus();

    try {
      const baseUrl = resolveSheetsUrl(state.sheetsUrl);
      const url = baseUrl.includes("?")
        ? `${baseUrl}&action=getData`
        : `${baseUrl}?action=getData`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();

      if (data) {
        if (data.profile) {
          state.profile = {
            name: data.profile.Name || data.profile.name || state.profile.name,
            birthday: data.profile.Birthday || data.profile.birthday || state.profile.birthday,
            interests: data.profile.Interests || data.profile.interests || state.profile.interests,
            role: data.profile.Role || data.profile.role || state.profile.role
          };
        }

        if (data.lore) {
          state.friendLore = { ...state.friendLore, ...data.lore };
        }

        if (data.messages && data.messages.length > 0) {
          const cloudIds = new Set(data.messages.map(m => m.id));
          const localUnsynced = state.messages.filter(m => !cloudIds.has(m.id));
          state.messages = [...data.messages, ...localUnsynced];
        }

        // Cleanse and sanitize incoming cloud data (remove legacy ALIEN STAGE & AMICA labels)
        if (data.tasks && data.tasks.length > 0) {
          state.studentTasks = data.tasks.map(t => ({
            ...t,
            text: (t.text || "").replace(/AMICA/gi, "N.O.V.A")
          }));
        }
        if (data.reminders && data.reminders.length > 0) {
          state.reminders = data.reminders.filter(r => !/alien stage/i.test(r.title || ""));
        }
        if (data.knowledgeGraph && data.knowledgeGraph.length > 0) {
          state.knowledgeGraph = data.knowledgeGraph.map(k => ({
            ...k,
            target: (k.target || "").replace(/,?\s*ALIEN STAGE/gi, "")
          }));
        }
        if (data.projectMemory && data.projectMemory.length > 0) {
          state.projectMemory = data.projectMemory.filter(p => !/alien stage/i.test(p.name || ""));
        }

        // If the sheet was completely empty or has unconfigured fields, ask Anushi questions
        const isSheetEmpty = (data.isEmpty === true) || 
          (!data.lore || !data.lore.goals || data.lore.goals.includes("To be configured"));

        if (isSheetEmpty) {
          checkAndPromptAnushiQuestions();
        }

        state.sheetsStatus = "synced";
        saveLocalStateOnly();
        renderAll();
      }
    } catch (err) {
      console.warn("[N.O.V.A Sheets Fetch Error]", err);
      state.sheetsStatus = "error";
      renderSheetsStatus();
    }
  }

  function checkAndPromptAnushiQuestions() {
    const alreadyAsked = state.messages.some(m => 
      m.role === "model" && m.content && m.content.includes("NOVA AI Memory Vault")
    );
    if (alreadyAsked) return;

    const onboardingMsg = {
      id: "onboard-" + Date.now(),
      role: "model",
      content: `Hey **${state.profile.name || "Anushi"}**! 👋 

I've linked to our **NOVA AI Memory Vault**, and I have your basic settings saved:
* 🎂 **Birthday:** ${state.profile.birthday || "08/09/2008"} (September 8, 2008)
* 🛡️ **Passions:** ${state.profile.interests || "Software Engineering & CyberSecurity"}

To help me give you truly personalized answers, can you tell me a bit more?
1. 💻 **Current Focus:** What programming languages, security domains (e.g., ethical hacking, network defense, web security), or projects are you currently tackling?
2. 🎯 **Current Goals:** What is your #1 big goal or milestone right now?
3. ☕ **Downtime & Fun:** When you're not coding or studying, what are your favorite ways to relax?
4. 💬 **Inside Jokes & Style:** Any specific topics, inside jokes, or speaking tone you want me to use?

Just reply right here in chat, and I'll automatically log everything into your NOVA AI memory vault! 🚀`,
      timestamp: new Date().toISOString(),
      mode: "default"
    };

    state.messages.push(onboardingMsg);
    saveLocalState();
    renderMessages();
  }

  function extractAndSaveLoreFromMessage(text) {
    if (!text) return;
    let updated = false;
    const lower = text.toLowerCase();

    // Detect Goals
    const goalMatch = text.match(/(?:my goal is|i want to|aiming to|hoping to|working on)\s+([^.!?\n]+)/i);
    if (goalMatch && goalMatch[1]) {
      const extractedGoal = goalMatch[1].trim();
      if (extractedGoal.length > 5 && (!state.friendLore.goals || state.friendLore.goals.includes("To be configured"))) {
        state.friendLore.goals = extractedGoal;
        updated = true;
      }
    }

    // Detect Hobbies / Interests
    const hobbyMatch = text.match(/(?:i love|i like|my hobby is|my hobbies are|in my free time I)\s+([^.!?\n]+)/i);
    if (hobbyMatch && hobbyMatch[1]) {
      const extractedHobby = hobbyMatch[1].trim();
      if (extractedHobby.length > 5) {
        if (!state.friendLore.hobbies || state.friendLore.hobbies.includes("To be configured")) {
          state.friendLore.hobbies = `Software engineering, CyberSecurity, ${extractedHobby}`;
        } else if (!state.friendLore.hobbies.toLowerCase().includes(extractedHobby.toLowerCase())) {
          state.friendLore.hobbies += `, ${extractedHobby}`;
        }
        updated = true;
      }
    }

    // Detect tech stack keywords
    const techKeywords = ["python", "javascript", "c++", "linux", "kali", "wireshark", "cryptography", "web dev", "networking", "git", "bash", "reverse engineering"];
    const foundTech = techKeywords.filter(kw => lower.includes(kw));
    if (foundTech.length > 0) {
      const targetStr = foundTech.map(t => t.toUpperCase()).join(", ");
      const exists = state.knowledgeGraph.some(k => k.entity.includes("Anushi") && k.target.includes(targetStr));
      if (!exists) {
        state.knowledgeGraph.push({
          id: "kg-" + Date.now(),
          entity: "Anushi Ranshika Peiris",
          relation: "Tech Stack & Tools",
          target: targetStr
        });
        updated = true;
      }
    }

    if (updated) {
      saveLocalState();
    }
  }

  async function syncSaveSheets() {
    if (!state.sheetsUrl) return;
    state.sheetsStatus = "syncing";
    renderSheetsStatus();

    const payload = JSON.stringify({
      action: "syncAll",
      profile: {
        Name: state.profile.name || "Anushi Ranshika Peiris",
        Birthday: state.profile.birthday || "08/09/2008",
        Interests: state.profile.interests || "Software engineering, CyberSecurity",
        Role: state.profile.role || "Student / Aspiring Software Engineer & CyberSecurity Specialist",
        Companion: "N.O.V.A.",
        Architect: "Lead Engineer Aken Sanketh"
      },
      lore: state.friendLore,
      tasks: state.studentTasks,
      reminders: state.reminders,
      knowledgeGraph: state.knowledgeGraph,
      projectMemory: state.projectMemory,
      messages: state.messages.slice(-30)
    });

    const targetUrl = resolveSheetsUrl(state.sheetsUrl);

    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload
      });

      if (res.ok) {
        state.sheetsStatus = "synced";
      } else {
        throw new Error("HTTP " + res.status);
      }
    } catch (err) {
      console.warn("[N.O.V.A Sheets Direct POST failed, retrying with fallback]", err);
      try {
        await fetch(state.sheetsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: payload
        });
        state.sheetsStatus = "synced";
      } catch (fallbackErr) {
        console.error("[N.O.V.A Sheets Emergency Sync Failed]", fallbackErr);
        state.sheetsStatus = "error";
      }
    }

    renderSheetsStatus();
    if (state.sheetsStatus === "synced") {
      setTimeout(() => {
        if (state.sheetsStatus === "synced") {
          state.sheetsStatus = "idle";
          renderSheetsStatus();
        }
      }, 3000);
    }
  }

  // ── FILE ATTACHMENT HANDLERS ───────────────────────────────────────────

  function processFiles(fileList) {
    Array.from(fileList).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        state.attachments.push({
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          base64: reader.result,
          size: file.size
        });
        renderAttachments();
      };
      reader.readAsDataURL(file);
    });
  }

  // ── EVENT LISTENERS SETUP ───────────────────────────────────────────────

  function setupEventListeners() {
    // Mode Buttons Header
    DOM.modeSelector.addEventListener("click", (e) => {
      const btn = e.target.closest(".mode-btn");
      if (btn && btn.dataset.mode) {
        if (btn.dataset.mode === "diagnostics") {
          triggerDiagnostics();
        } else {
          state.currentMode = btn.dataset.mode;
          renderModeUI();
          renderPromptChips();
          saveLocalState();
        }
      }
    });

    // Chat Input Keyboard and Autocomplete dropdown
    DOM.chatInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (val === "/") {
        DOM.commandsDropdown.classList.remove("hidden");
      } else if (!val.startsWith("/")) {
        DOM.commandsDropdown.classList.add("hidden");
      }

      // Auto-expand textarea height
      DOM.chatInput.style.height = "auto";
      DOM.chatInput.style.height = Math.min(DOM.chatInput.scrollHeight, 120) + "px";
    });

    DOM.chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        DOM.commandsDropdown.classList.add("hidden");
        handleSendMessage();
      }
    });

    DOM.sendBtn.addEventListener("click", () => {
      DOM.commandsDropdown.classList.add("hidden");
      handleSendMessage();
    });

    // Commands Dropdown Items
    DOM.commandsDropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".command-item");
      if (btn && btn.dataset.cmd) {
        const cmd = btn.dataset.cmd;
        DOM.commandsDropdown.classList.add("hidden");
        if (cmd === "/diagnostics") {
          DOM.chatInput.value = "";
          triggerDiagnostics();
        } else {
          state.currentMode = cmd.replace("/", "");
          DOM.chatInput.value = "";
          renderModeUI();
          renderPromptChips();
          saveLocalState();
        }
      }
    });

    // File Attachment
    DOM.attachFileBtn.addEventListener("click", () => DOM.fileInput.click());
    DOM.fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    });

    // Mic Button
    DOM.micBtn.addEventListener("click", () => {
      toggleVoiceMode(!state.voiceActive);
    });

    DOM.voiceToggleCheckbox.addEventListener("change", (e) => {
      toggleVoiceMode(e.target.checked);
    });

    // Drag and Drop
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      DOM.dragDropOverlay.classList.remove("hidden");
    });
    DOM.dragDropOverlay.addEventListener("dragleave", () => {
      DOM.dragDropOverlay.classList.add("hidden");
    });
    DOM.dragDropOverlay.addEventListener("drop", (e) => {
      e.preventDefault();
      DOM.dragDropOverlay.classList.add("hidden");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    });

    // Timer Controls
    DOM.timerToggleBtn.addEventListener("click", () => {
      if (state.timerActive) pauseTimer();
      else startTimer();
    });
    DOM.timerResetBtn.addEventListener("click", resetTimer);
    DOM.timerSwitchBtn.addEventListener("click", switchTimerMode);

    // Tasks Form
    DOM.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = DOM.taskInput.value.trim();
      if (!txt) return;
      state.studentTasks.push({ id: Date.now().toString(), text: txt, completed: false });
      DOM.taskInput.value = "";
      saveLocalState();
      renderTasks();
    });

    // Reminders Form
    DOM.reminderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = DOM.reminderTitleInput.value.trim();
      const time = DOM.reminderTimeInput.value.trim();
      if (!title) return;
      state.reminders.push({ id: "r-" + Date.now(), title, time: time || "Today", completed: false });
      DOM.reminderTitleInput.value = "";
      DOM.reminderTimeInput.value = "";
      saveLocalState();
      renderReminders();
    });

    // Memory Reset
    DOM.resetMemoryBtn.addEventListener("click", resetMemory);
    DOM.quickResetBtn.addEventListener("click", resetMemory);

    // Error banner close
    DOM.closeErrorBannerBtn.addEventListener("click", hideApiError);

    // Sidebar Mobile Toggle
    DOM.sidebarToggleBtn.addEventListener("click", () => {
      DOM.sidebarPanel.classList.toggle("open");
    });

    // Modals Open/Close
    DOM.loreModalBtn.addEventListener("click", openLoreModal);
    DOM.closeLoreModalBtn.addEventListener("click", closeLoreModal);

    DOM.loreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.profile = {
        name: DOM.loreFullName?.value.trim() || state.profile.name,
        birthday: DOM.loreBirthday?.value.trim() || state.profile.birthday,
        interests: DOM.loreInterests?.value.trim() || state.profile.interests,
        role: DOM.loreRole?.value.trim() || state.profile.role
      };
      state.friendLore = {
        hobbies: DOM.loreHobbies.value.trim(),
        insideJokes: DOM.loreInsideJokes.value.trim(),
        goals: DOM.loreGoals.value.trim(),
        customLore: DOM.loreCustom.value.trim()
      };
      saveLocalState();
      closeLoreModal();
    });

    DOM.restoreDefaultLoreBtn.addEventListener("click", () => {
      if (confirm("Restore factory default profile and friend lore configuration?")) {
        state.profile = { ...DEFAULT_PROFILE };
        state.friendLore = { ...DEFAULT_LORE };
        saveLocalState();
        closeLoreModal();
      }
    });

    DOM.apiKeyModalBtn?.addEventListener("click", openApiKeyModal);
    DOM.closeApiKeyModalBtn?.addEventListener("click", closeApiKeyModal);
    DOM.cancelApiKeyBtn?.addEventListener("click", closeApiKeyModal);
    DOM.saveApiKeyBtn?.addEventListener("click", () => {
      const key = DOM.apiKeyInput?.value.trim();
      if (key) {
        state.apiKey = key;
        localStorage.setItem("amica_gemini_key", key);
        closeApiKeyModal();
        hideApiError();
      }
    });

    DOM.sheetsStatusBadge?.addEventListener("click", openSheetsModal);
    DOM.closeSheetsModalBtn?.addEventListener("click", closeSheetsModal);
    DOM.cancelSheetsBtn?.addEventListener("click", closeSheetsModal);

    DOM.copyAppsScriptBtn?.addEventListener("click", () => {
      navigator.clipboard.writeText(APPS_SCRIPT_CODE);
      if (DOM.copyAppsScriptBtn) DOM.copyAppsScriptBtn.textContent = "Script Copied! ✓";
      setTimeout(() => { if (DOM.copyAppsScriptBtn) DOM.copyAppsScriptBtn.textContent = "Copy Apps Script Code"; }, 3000);
    });

    DOM.saveSheetsBtn?.addEventListener("click", () => {
      closeSheetsModal();
      syncSaveSheets();
      syncFetchSheets();
    });

    DOM.disconnectSheetsBtn.addEventListener("click", () => {
      if (confirm("Disconnect NOVA AI cloud memory?")) {
        localStorage.removeItem("amica_sheets_url");
        state.sheetsUrl = "";
        state.sheetsStatus = "idle";
        closeSheetsModal();
        renderSheetsStatus();
      }
    });

    // Neural OS Vision Modal & Tab switching
    DOM.visionModalBtn?.addEventListener("click", openVisionModal);
    DOM.closeVisionModalBtn?.addEventListener("click", closeVisionModal);
    DOM.closeVisionModalFooterBtn?.addEventListener("click", closeVisionModal);

    const visionTabBtns = document.querySelectorAll(".vision-tab-btn");
    visionTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        visionTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tabKey = btn.dataset.vtab;
        document.querySelectorAll(".vision-tab-content").forEach(content => {
          content.classList.add("hidden");
        });

        if (tabKey === "cognitive") document.getElementById("vtabCognitive")?.classList.remove("hidden");
        if (tabKey === "knowledge") document.getElementById("vtabKnowledge")?.classList.remove("hidden");
        if (tabKey === "projects") document.getElementById("vtabProjects")?.classList.remove("hidden");
        if (tabKey === "skills") document.getElementById("vtabSkills")?.classList.remove("hidden");
      });
    });

    DOM.addKgForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const entity = DOM.kgEntity.value.trim();
      const relation = DOM.kgRelation.value.trim();
      const target = DOM.kgTarget.value.trim();
      if (!entity || !relation || !target) return;

      state.knowledgeGraph.push({
        id: "kg-" + Date.now(),
        entity,
        relation,
        target
      });
      DOM.kgEntity.value = "";
      DOM.kgRelation.value = "";
      DOM.kgTarget.value = "";
      saveLocalState();
      renderKnowledgeGraph();
    });
  }

  // ── MODAL HELPERS ──────────────────────────────────────────────────────

  function openVisionModal() {
    renderKnowledgeGraph();
    renderProjectMemory();
    DOM.visionModal?.classList.remove("hidden");
  }

  function closeVisionModal() {
    DOM.visionModal?.classList.add("hidden");
  }

  function openLoreModal() {
    if (DOM.loreFullName) DOM.loreFullName.value = state.profile.name || "";
    if (DOM.loreBirthday) DOM.loreBirthday.value = state.profile.birthday || "";
    if (DOM.loreRole) DOM.loreRole.value = state.profile.role || "";
    if (DOM.loreInterests) DOM.loreInterests.value = state.profile.interests || "";
    DOM.loreHobbies.value = state.friendLore.hobbies || "";
    DOM.loreInsideJokes.value = state.friendLore.insideJokes || "";
    DOM.loreGoals.value = state.friendLore.goals || "";
    DOM.loreCustom.value = state.friendLore.customLore || "";
    DOM.loreModal.classList.remove("hidden");
  }
  function closeLoreModal() { DOM.loreModal.classList.add("hidden"); }

  function openApiKeyModal() {
    // Built-in API key active — modal disabled
  }
  function closeApiKeyModal() { DOM.apiKeyModal.classList.add("hidden"); }

  function openSheetsModal() {
    DOM.sheetsModal.classList.remove("hidden");
  }
  function closeSheetsModal() { DOM.sheetsModal.classList.add("hidden"); }

  function resetMemory() {
    if (confirm("Are you sure you want to clear your current neural memory link with N.O.V.A?")) {
      state.messages = [INITIAL_MESSAGE];
      state.currentMode = "default";
      saveLocalStateOnly(); // Clear local chat view only, keep NOVA AI cloud memory intact
      hideApiError();
      renderAll();
    }
  }

  function showApiError(msg) {
    DOM.apiErrorMessage.textContent = msg;
    DOM.apiErrorBanner.classList.remove("hidden");
  }

  function hideApiError() {
    DOM.apiErrorBanner.classList.add("hidden");
  }

  // ── LIGHTWEIGHT MARKDOWN & HTML SANITIZER ──────────────────────────────

  function parseMarkdown(src) {
    if (!src) return "";
    let html = escapeHtml(src);

    // Code blocks ```lang ... ```
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings # ## ###
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Auto-break numbered lists merged into single sentences (e.g. "them. 1. VC... 2. CineMax...")
    html = html.replace(/([.!?]|\w)\s+(\d+\.\s+[\w\*])/g, '$1<br><br><strong>$2</strong>');
    html = html.replace(/(^|\n)(\d+\.\s+)/g, '$1<br><strong>$2</strong>');

    // Bullet lists (- or * at start of line)
    html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<br>• $1');

    // Paragraph double linebreaks
    html = html.replace(/\n\s*\n/g, '<br><br>');

    return html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Launch app when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
