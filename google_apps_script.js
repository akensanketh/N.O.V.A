/**
 * ============================================================================
 * N.O.V.A. — NOVA AI Memory Engine
 * ============================================================================
 * Architect: Lead Engineer Aken Sanketh | Primary User: Anushi Ranshika Peiris
 * 
 * Instructions:
 * 1. Open your cloud spreadsheet editor (https://sheets.new)
 * 2. Rename the project to: "N.O.V.A. Memory Vault — Anushi"
 * 3. Go to: Extensions > Apps Script
 * 4. Replace any existing code with this ENTIRE script.
 * 5. Run the function: setupDefaultSheets() once to create all tabs & default data.
 * 6. Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Description: "N.O.V.A. AI Memory Cloud"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click Deploy, Authorize access, and copy the Web App URL.
 * 8. Paste the Web App URL into N.O.V.A. (under the NOVA AI Memory button in the header).
 * ============================================================================
 */

// Default settings for Anushi Ranshika Peiris
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

/**
 * Handle GET Requests from N.O.V.A. Web App
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = e && e.parameter && e.parameter.action ? e.parameter.action : 'getData';

    // Auto-initialize if sheets are missing
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

      return ContentService.createTextOutput(JSON.stringify(payload))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      status: 'N.O.V.A. AI Memory Core Online' 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST Requests from N.O.V.A. Web App to Save State
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureAllSheetsExist(ss);

    var rawContent = e.postData.contents;
    var payload = JSON.parse(rawContent);

    if (payload.action === 'syncAll' || payload.action === 'saveData') {
      if (payload.profile) saveSheetKeyValue(ss, 'Profile', payload.profile);
      if (payload.lore) saveSheetKeyValue(ss, 'Lore', payload.lore);
      if (payload.knowledgeGraph) saveSheetData(ss, 'KnowledgeGraph', payload.knowledgeGraph);
      if (payload.tasks) saveSheetData(ss, 'Tasks', payload.tasks);
      if (payload.reminders) saveSheetData(ss, 'Reminders', payload.reminders);
      if (payload.messages) saveSheetData(ss, 'Messages', payload.messages);
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      status: 'Memory synced successfully' 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Setup / Initialize all sheets with default basic settings
 * Run this directly in Apps Script if desired!
 */
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
    msgSheet.appendRow([
      'init-welcome', 
      'model', 
      'N.O.V.A. memory linked for Anushi Ranshika Peiris.', 
      new Date().toISOString(), 
      'default'
    ]);
  }

  Logger.log("N.O.V.A. Memory Vault initialization complete!");
}

/**
 * Helper: Ensure all required sheets/slides exist with styling
 */
function ensureAllSheetsExist(ss) {
  var requiredSheets = ['Profile', 'Lore', 'KnowledgeGraph', 'Tasks', 'Reminders', 'Messages'];
  for (var i = 0; i < requiredSheets.length; i++) {
    var name = requiredSheets[i];
    if (!ss.getSheetByName(name)) {
      var s = ss.insertSheet(name);
      // Format headers
      s.setTabColor(getTabColor(name));
    }
  }
}

function getTabColor(name) {
  switch (name) {
    case 'Profile': return '#00f0ff'; // Neon Cyan
    case 'Lore': return '#ff007f';    // Hot Pink
    case 'KnowledgeGraph': return '#8b5cf6'; // Violet
    case 'Tasks': return '#10b981';   // Emerald
    case 'Reminders': return '#f59e0b'; // Amber
    default: return '#6b7280';
  }
}

/**
 * Helper: Read key-value sheet (Profile, Lore)
 */
function getSheetKeyValue(sheet) {
  if (!sheet) return null;
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return null;
  var data = {};
  for (var i = 1; i < values.length; i++) {
    var key = values[i][0];
    if (key) {
      data[key] = values[i][1] !== undefined ? values[i][1] : '';
    }
  }
  return Object.keys(data).length > 0 ? data : null;
}

/**
 * Helper: Save key-value sheet (Profile, Lore)
 */
function saveSheetKeyValue(ss, sheetName, obj) {
  if (!obj) return;
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  sheet.clear();
  sheet.appendRow(['Key / Setting', 'Value']);
  
  // Format Header row
  var headerRange = sheet.getRange(1, 1, 1, 2);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0f172a');
  headerRange.setFontColor('#38bdf8');

  for (var k in obj) {
    var val = obj[k];
    if (typeof val === 'object' && val !== null) {
      val = JSON.stringify(val);
    }
    sheet.appendRow([k, val]);
  }
  sheet.autoResizeColumns(1, 2);
}

/**
 * Helper: Read tabular rows (Tasks, Reminders, KnowledgeGraph, Messages)
 */
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

/**
 * Helper: Save tabular rows (Tasks, Reminders, KnowledgeGraph, Messages)
 */
function saveSheetData(ss, sheetName, rows) {
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  sheet.clear();
  if (!rows || rows.length === 0) return;

  var cleanRows = rows.map(function(r) {
    var copy = {};
    for (var k in r) {
      copy[k] = (typeof r[k] === 'object' && r[k] !== null) ? JSON.stringify(r[k]) : r[k];
    }
    return copy;
  });

  var headers = Object.keys(cleanRows[0]);
  sheet.appendRow(headers);

  // Format Header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0f172a');
  headerRange.setFontColor('#00f0ff');

  cleanRows.forEach(function(row) {
    sheet.appendRow(headers.map(function(h) { return row[h] !== undefined ? row[h] : ''; }));
  });
  sheet.autoResizeColumns(1, headers.length);
}
