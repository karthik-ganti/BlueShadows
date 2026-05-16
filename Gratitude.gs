// ============================================================
//  Gratitude.gs  —  Blue Shadows Foundation
//  Copy this entire file into the Google Apps Script editor:
//  Google Sheet → Extensions → Apps Script → New file → Gratitude.gs
// ============================================================

// Column positions in the donations sheet (1-indexed)
var COL_NAME      = 1;  // A
var COL_PHONE     = 2;  // B
var COL_AMOUNT    = 3;  // C
var COL_PURPOSE   = 4;  // D
var COL_STATUS    = 8;  // H  (add "Status" header here manually)

// -----------------------------------------------------------
// Installs the custom menu every time the spreadsheet opens
// -----------------------------------------------------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Blue Shadows Actions')
    .addItem('Send Gratitude Message', 'sendGratitudeForSelectedRow')
    .addToUi();
}

// -----------------------------------------------------------
// Main function — wired to the menu item
// Select the donor's row in the sheet, then run this
// -----------------------------------------------------------
function sendGratitudeForSelectedRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row   = sheet.getActiveCell().getRow();
  var ui    = SpreadsheetApp.getUi();

  if (row <= 1) {
    ui.alert('Please select a donor row (not the header row).');
    return;
  }

  var name    = sheet.getRange(row, COL_NAME).getValue();
  var rawPhone = String(sheet.getRange(row, COL_PHONE).getValue());
  var amount  = sheet.getRange(row, COL_AMOUNT).getValue();
  var purpose = sheet.getRange(row, COL_PURPOSE).getValue();

  if (!rawPhone || rawPhone === 'undefined') {
    ui.alert('No phone number found in row ' + row + '.');
    return;
  }

  var phone = normalisePhone(rawPhone);
  if (phone.length !== 12) {
    ui.alert('Phone number could not be normalised to 12 digits: ' + rawPhone + '\nPlease fix it in the sheet and retry.');
    return;
  }

  // Confirmation dialog
  var confirm = ui.alert(
    'Send WhatsApp Gratitude Message',
    'Row ' + row + ' — Donor Details:\n\n' +
    '  Name   : ' + name + '\n' +
    '  Phone  : ' + rawPhone + '\n' +
    '  Amount : ₹' + amount + '\n' +
    '  Purpose: ' + purpose + '\n\n' +
    'This will send a WhatsApp message to the donor.',
    ui.ButtonSet.OK_CANCEL
  );

  if (confirm !== ui.Button.OK) return;

  var result = sendWhatsApp(name, phone, amount, purpose);

  if (result.success) {
    sheet.getRange(row, COL_STATUS).setValue('WA Sent');
    ui.alert('WhatsApp : ✓ Delivered\nColumn H updated → "WA Sent"');
  } else {
    sheet.getRange(row, COL_STATUS).setValue('Failed');
    ui.alert('WhatsApp send failed.\nError: ' + result.error + '\n\nColumn H updated → "Failed"');
  }
}

// -----------------------------------------------------------
// Sends a WhatsApp template message via Meta Cloud API
// -----------------------------------------------------------
function sendWhatsApp(name, phone, amount, purpose) {
  var props      = PropertiesService.getScriptProperties();
  var token      = props.getProperty('WHATSAPP_TOKEN');
  var phoneId    = props.getProperty('WHATSAPP_PHONE_ID');
  var template   = props.getProperty('WHATSAPP_TEMPLATE') || 'blue_shadows_gratitude';

  if (!token || !phoneId) {
    return { success: false, error: 'WHATSAPP_TOKEN or WHATSAPP_PHONE_ID not set in Script Properties.' };
  }

  var url = 'https://graph.facebook.com/v19.0/' + phoneId + '/messages';

  var payload = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: template,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: name },
            { type: 'text', text: '₹' + amount },
            { type: 'text', text: purpose }
          ]
        }
      ]
    }
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var code     = response.getResponseCode();
    if (code === 200 || code === 201) {
      return { success: true };
    } else {
      return { success: false, error: 'HTTP ' + code + ': ' + response.getContentText() };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// -----------------------------------------------------------
// Normalises any Indian phone number to 12-digit 91XXXXXXXXXX
// -----------------------------------------------------------
function normalisePhone(raw) {
  var digits = raw.replace(/\D/g, '');          // strip all non-digits
  if (digits.startsWith('0'))  digits = digits.slice(1);   // remove leading 0
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return '91' + digits;
  return digits;  // return as-is; caller checks length
}
