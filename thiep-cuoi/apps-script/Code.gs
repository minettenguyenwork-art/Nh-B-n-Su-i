/**
 * Dán toàn bộ file này vào Google Apps Script của một Google Sheet.
 * Mỗi cặp đôi = 1 Google Sheet riêng (copy sheet mẫu là xong).
 * Xem HUONG-DAN.md, bước 4.
 */
const TEN_TAB = "RSVP";

function layTab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TEN_TAB);
  if (!sh) {
    sh = ss.insertSheet(TEN_TAB);
    sh.appendRow(["Thời gian", "Tên", "Tham dự", "Số người", "Lời chúc", "Link khách"]);
  }
  return sh;
}

// Khách gửi form xác nhận
function doPost(e) {
  const p = e.parameter;
  const cat = (s, n) => String(s || "").slice(0, n);
  layTab_().appendRow([new Date(), cat(p.ten, 80), cat(p.thamDu, 10), cat(p.soNguoi, 2), cat(p.loiChuc, 500), cat(p.khach, 80)]);
  return ContentService.createTextOutput("ok");
}

// Thiệp lấy danh sách lời chúc để hiển thị
function doGet() {
  const rows = layTab_().getDataRange().getValues().slice(1);
  const ds = rows
    .filter((r) => r[4])
    .reverse()
    .slice(0, 200)
    .map((r) => ({ ten: r[1], loiChuc: r[4] }));
  return ContentService.createTextOutput(JSON.stringify(ds)).setMimeType(ContentService.MimeType.JSON);
}
