/* =========================================================
   THÔNG TIN THIỆP — MỖI ĐƠN HÀNG CHỈ CẦN SỬA FILE NÀY
   (và thay ảnh trong thư mục anh/, nhạc trong thư mục nhac/)
   ========================================================= */
window.THIEP = {
  chuRe: {
    ten: "Minh Anh",                 // tên gọi ngắn, hiện to trên bìa
    hoTen: "Nguyễn Minh Anh",
    bo: "Ông Nguyễn Văn A",
    me: "Bà Trần Thị B",
    queQuan: "Hà Nội",
  },
  coDau: {
    ten: "Thu Hà",
    hoTen: "Lê Thu Hà",
    bo: "Ông Lê Văn C",
    me: "Bà Phạm Thị D",
    queQuan: "Bắc Ninh",
  },

  // Giờ Việt Nam: giữ nguyên đuôi +07:00
  ngayCuoi: "2026-12-20T11:00:00+07:00",

  loiMoi:
    "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi trong ngày trọng đại. Sự hiện diện của bạn là niềm vinh hạnh cho chúng tôi.",

  anhBia: "https://picsum.photos/id/1059/1200/1800",   // thay bằng "anh/bia.jpg"

  suKien: [
    {
      ten: "Lễ Vu Quy",
      gio: "08:00",
      ngay: "Chủ nhật, 20/12/2026",
      amLich: "Nhằm ngày 10/11 năm Bính Ngọ",
      diaDiem: "Tư gia nhà gái",
      diaChi: "Số 1 Đường ABC, TP. Bắc Ninh",
      banDo: "https://maps.google.com/?q=Bac+Ninh",
    },
    {
      ten: "Tiệc Cưới",
      gio: "11:00",
      ngay: "Chủ nhật, 20/12/2026",
      amLich: "Nhằm ngày 10/11 năm Bính Ngọ",
      diaDiem: "Trung tâm tiệc cưới XYZ — Sảnh Hoa Hồng",
      diaChi: "Số 2 Đường DEF, Hà Nội",
      banDo: "https://maps.google.com/?q=Ha+Noi",
    },
  ],

  // Câu chuyện tình yêu (để [] nếu không dùng)
  chuyenTinhYeu: [
    { moc: "2019", tieuDe: "Lần đầu gặp gỡ", noiDung: "Chúng mình gặp nhau ở thư viện trường..." },
    { moc: "2022", tieuDe: "Hẹn hò", noiDung: "Chuyến đi Đà Lạt đầu tiên..." },
    { moc: "2026", tieuDe: "Cầu hôn", noiDung: "Và anh đã nói lời yêu thương ấy..." },
  ],

  album: [
    "https://picsum.photos/id/1011/800/1000",
    "https://picsum.photos/id/1027/800/1000",
    "https://picsum.photos/id/1035/800/1000",
    "https://picsum.photos/id/1043/800/1000",
    "https://picsum.photos/id/1062/800/1000",
    "https://picsum.photos/id/1069/800/1000",
  ],

  nhac: "nhac/nhac-nen.mp3",          // để "" nếu không dùng nhạc

  // Hộp mừng cưới — mã ngân hàng theo VietQR: VCB, TCB, MB, ACB, BIDV, VPB, TPB, ICB (VietinBank), VBA (Agribank)...
  mungCuoi: [
    { danhCho: "Chú rể", nganHang: "VCB", soTaiKhoan: "0123456789", chuTaiKhoan: "NGUYEN MINH ANH" },
    { danhCho: "Cô dâu", nganHang: "TCB", soTaiKhoan: "9876543210", chuTaiKhoan: "LE THU HA" },
  ],

  // Link Google Apps Script để lưu xác nhận tham dự + lời chúc (xem HUONG-DAN.md, bước 4)
  // Để "" thì form vẫn hiện nhưng chỉ báo cảm ơn, không lưu.
  googleScriptUrl: "",

  // Dòng quảng cáo dịch vụ của bạn ở cuối thiệp
  chanTrang: { ten: "Thiệp cưới online by ...", link: "https://zalo.me/0900000000" },
};
