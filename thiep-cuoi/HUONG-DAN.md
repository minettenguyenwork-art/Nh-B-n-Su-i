# Hướng dẫn làm thiệp cưới online — Cách B (web tĩnh)

Ý tưởng: bạn có **1 bộ mẫu** (thư mục `mau-01/`). Mỗi đơn hàng = **copy thư mục mẫu → sửa `data.js` + thay ảnh → đưa lên mạng**. Mỗi đơn mất 20–40 phút, chi phí host = 0đ.

```
thiep-cuoi/
├── mau-01/              ← mẫu thiệp
│   ├── index.html       ← khung trang (chỉ sửa 4 dòng tiêu đề/ảnh xem trước)
│   ├── data.js          ← TOÀN BỘ thông tin cặp đôi — sửa file này
│   ├── style.css        ← giao diện (đổi màu ở đầu file)
│   ├── script.js        ← chức năng (không cần đụng)
│   ├── anh/             ← ảnh của cặp đôi
│   └── nhac/            ← nhạc nền
└── apps-script/Code.gs  ← code lưu xác nhận tham dự vào Google Sheets
```

---

## Bước 0 — Chuẩn bị công cụ (làm 1 lần)

1. Cài **VS Code** (code.visualstudio.com) để sửa file. Cài thêm tiện ích **Live Server** để xem thử thiệp trên máy (chuột phải `index.html` → *Open with Live Server*).
2. Tạo tài khoản **GitHub** (github.com) và **Vercel** (vercel.com — đăng nhập bằng GitHub). Hoặc dùng **Netlify** (netlify.com).
3. (Nên có) Mua tên miền riêng, ví dụ `thiepcuoi-abc.vn` (~250–400k/năm tại Mắt Bão, PA Việt Nam, Tenten...).
4. Công cụ nén ảnh: **squoosh.app** hoặc **tinypng.com**.

## Bước 1 — Nhận thông tin từ khách

Tạo 1 Google Form gửi khách, gồm: tên cô dâu/chú rể, tên bố mẹ hai bên, ngày giờ các lễ, địa điểm + link Google Maps, 10–20 ảnh, ảnh bìa, bài nhạc, số tài khoản ngân hàng (cho QR mừng cưới), câu chuyện tình yêu (tuỳ chọn).

## Bước 2 — Tạo thiệp cho đơn mới

1. Copy thư mục `mau-01` thành thư mục mới, đặt tên = đường link mong muốn, ví dụ `minhanh-thuha`.
2. **Ảnh**: nén từng ảnh (chiều dài ~1200–1600px, dưới 300KB) rồi bỏ vào `anh/`. Đặt tên đơn giản không dấu: `bia.jpg`, `1.jpg`, `2.jpg`...
3. **Nhạc**: bỏ file mp3 vào `nhac/`, đặt tên `nhac-nen.mp3` (nên dưới 3MB). Dùng nhạc khách cung cấp hoặc nhạc miễn phí bản quyền.
4. **Mở `data.js`** và sửa theo chú thích trong file:
   - `anhBia: "anh/bia.jpg"`
   - `album: ["anh/1.jpg", "anh/2.jpg", ...]`
   - `ngayCuoi`: giữ đúng định dạng `"2026-12-20T11:00:00+07:00"`
   - `banDo`: mở Google Maps → tìm địa điểm → *Chia sẻ* → *Sao chép đường liên kết* → dán vào
   - `mungCuoi`: mã ngân hàng viết tắt (VCB, TCB, MB, ACB, BIDV, ICB, VBA...), chủ tài khoản viết HOA KHÔNG DẤU. **Quét thử QR bằng app ngân hàng trước khi giao!**
5. **Mở `index.html`**, sửa 4 dòng có chú thích `SỬA 4 DÒNG DƯỚI` (tiêu đề + ảnh xem trước khi gửi Zalo). `og:image` phải là **link đầy đủ** `https://.../anh/bia.jpg` (sau khi đã đưa lên mạng ở bước 3).
6. Xem thử bằng Live Server, bật chế độ điện thoại trong Chrome (F12 → biểu tượng điện thoại).

## Bước 3 — Đưa lên mạng (Vercel)

**Cách gọn nhất: 1 kho GitHub chứa tất cả thiệp**, mỗi cặp 1 thư mục:

```
kho-thiep/
├── index.html            ← trang giới thiệu dịch vụ của bạn (tuỳ chọn)
├── minhanh-thuha/
├── tuananh-lan/
└── ...
```

1. Lần đầu: tạo kho trên GitHub, kéo-thả các thư mục lên (*Add file → Upload files*), hoặc dùng **GitHub Desktop** cho dễ.
2. Vào Vercel → *Add New Project* → chọn kho đó → *Deploy* (không cần cấu hình gì).
3. Gắn tên miền: Vercel → *Settings → Domains* → nhập tên miền → làm theo hướng dẫn trỏ DNS ở nhà cung cấp tên miền.
4. Từ lần sau: chỉ cần upload thư mục mới lên GitHub → Vercel **tự cập nhật** sau ~30 giây.

Link thiệp: `https://thiepcuoi-abc.vn/minhanh-thuha/`

> Mỗi lần sửa ảnh xem trước mà Zalo vẫn hiện ảnh cũ: thêm `?v=2` vào cuối link khi gửi.

## Bước 4 — Lưu xác nhận tham dự & lời chúc (Google Sheets, miễn phí)

Làm 1 lần để có **Sheet mẫu**, sau đó mỗi đơn chỉ cần copy:

1. Tạo Google Sheet mới (đăng nhập tài khoản Google của bạn), đặt tên `RSVP - mẫu`.
2. Menu *Tiện ích mở rộng → Apps Script* → xoá code có sẵn → dán toàn bộ nội dung `apps-script/Code.gs` → Lưu.
3. Bấm *Triển khai (Deploy) → Tùy chọn triển khai mới* → loại **Ứng dụng web**:
   - Thực thi với tư cách: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
   → *Triển khai* → cấp quyền → copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
4. Dán URL vào `googleScriptUrl` trong `data.js`.
5. Gửi thử 1 xác nhận trên thiệp → kiểm tra tab `RSVP` trong Sheet có dòng mới.
6. **Mỗi đơn mới**: *Tệp → Tạo bản sao* Sheet mẫu → làm lại bước 3 để lấy URL mới. Chia sẻ Sheet (quyền xem) cho cặp đôi để họ theo dõi danh sách khách.

## Bước 5 — Gửi link có tên từng khách

Thêm `?khach=` vào cuối link, viết tên nối bằng dấu gạch ngang:

```
https://thiepcuoi-abc.vn/minhanh-thuha/?khach=Anh-Tuan-va-gia-dinh
https://thiepcuoi-abc.vn/minhanh-thuha/?khach=Co-Lan
```

Thiệp sẽ hiện "Kính gửi: Anh Tuan va gia dinh". Muốn có dấu tiếng Việt, cứ gõ có dấu (`?khach=Anh-Tuấn`) — Zalo/trình duyệt tự xử lý. Bạn có thể làm sẵn 1 file Google Sheets: cột A tên khách, cột B công thức `="https://.../?khach="&SUBSTITUTE(A2;" ";"-")` để cặp đôi copy gửi hàng loạt.

## Bước 6 — Tạo thêm mẫu mới

Copy `mau-01` thành `mau-02`, rồi chỉ đổi:
- **Màu**: 6 dòng biến màu ở đầu `style.css` (ví dụ đỏ-vàng truyền thống: `--chinh: #a3262a; --nen: #fff8ec; --nen-nhat: #f7e7c6`).
- **Font**: đổi link Google Fonts trong `index.html` và tên font trong `style.css`.
- **Bố cục/hoa văn**: thêm ảnh hoa văn PNG nền trong suốt vào các khối.

Có 4–6 mẫu khác phong cách (tối giản, truyền thống, vintage, hiện đại) là đủ để bắt đầu bán. Mỗi mẫu làm 1 thiệp demo với thông tin giả để gửi khách xem.

## Danh sách kiểm tra trước khi giao thiệp

- [ ] Tên, ngày giờ, địa điểm đúng (cho khách duyệt lại bằng chữ)
- [ ] Nút *Chỉ đường* mở đúng địa điểm
- [ ] Quét QR bằng app ngân hàng ra đúng tên chủ tài khoản
- [ ] Gửi thử RSVP, thấy dòng mới trong Google Sheet
- [ ] Mở link qua Zalo trên cả iPhone và Android: ảnh xem trước đúng, nhạc phát sau khi bấm *Mở thiệp*
- [ ] Trang tải dưới 3 giây trên 4G (tổng ảnh nên < 5MB)

## Giới hạn của cách B — khi nào nên nâng cấp

- Mỗi đơn vẫn phải sửa file bằng tay → khoảng **trên 30–50 đơn/tháng** sẽ thấy mệt.
- Khách không tự sửa được thiệp, mọi chỉnh sửa phải qua bạn.
- Khi đến mức đó, nên chuyển sang **cách C** (trang quản trị nhập liệu → tự sinh thiệp). Vì `data.js` đã tách riêng dữ liệu, việc nâng cấp sau này rất thuận lợi: chỉ cần thay `data.js` bằng dữ liệu lấy từ cơ sở dữ liệu.
