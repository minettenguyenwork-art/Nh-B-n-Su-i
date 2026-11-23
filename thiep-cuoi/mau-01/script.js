/* Không cần sửa file này khi làm đơn — mọi thông tin nằm trong data.js */
(function () {
  const D = window.THIEP;
  const $ = (s) => document.querySelector(s);

  // Tạo phần tử an toàn (không chèn HTML thô từ dữ liệu khách nhập)
  function el(tag, props = {}, ...con) {
    const e = document.createElement(tag);
    Object.assign(e, props);
    con.forEach((c) => c != null && e.append(c));
    return e;
  }

  // ---- Tên ----
  document.querySelectorAll("[data-ten]").forEach((n) => (n.textContent = D[n.dataset.ten].ten));

  // ---- Tên khách mời từ link: ?khach=Anh-Tuan  hoặc ?khach=Anh%20Tuấn ----
  const khach = new URLSearchParams(location.search).get("khach");
  $("#kinh-gui").textContent = khach
    ? "Kính gửi: " + khach.replace(/[-_]+/g, " ").trim()
    : "Trân trọng kính mời";

  // ---- Ngày ----
  const ngay = new Date(D.ngayCuoi);
  const dd = String(ngay.getDate()).padStart(2, "0");
  const mm = String(ngay.getMonth() + 1).padStart(2, "0");
  $("#ngay-bia").textContent = `${dd} . ${mm} . ${ngay.getFullYear()}`;

  // ---- Bìa ----
  $("#bia").style.backgroundImage = `url("${D.anhBia}")`;

  // ---- Gia đình ----
  function ben(nhan, p) {
    return [
      el("p", { className: "nhan", textContent: nhan }),
      el("p", { className: "ho-ten", textContent: p.hoTen }),
      el("p", { textContent: p.bo }),
      el("p", { textContent: p.me }),
      el("p", { textContent: p.queQuan }),
    ];
  }
  $("#nha-trai").append(...ben("Nhà trai", D.chuRe));
  $("#nha-gai").append(...ben("Nhà gái", D.coDau));
  $("#loi-moi").textContent = D.loiMoi;

  // ---- Đếm ngược ----
  function dem() {
    let t = Math.max(0, ngay - Date.now()) / 1000;
    $("#dn-ngay").textContent = Math.floor(t / 86400);
    $("#dn-gio").textContent = Math.floor((t % 86400) / 3600);
    $("#dn-phut").textContent = Math.floor((t % 3600) / 60);
    $("#dn-giay").textContent = Math.floor(t % 60);
  }
  dem();
  setInterval(dem, 1000);

  // ---- Sự kiện ----
  D.suKien.forEach((s) => {
    $("#su-kien").append(
      el("div", { className: "the-su-kien hien" },
        el("h4", { textContent: s.ten }),
        el("p", { className: "gio", textContent: s.gio }),
        el("p", { textContent: s.ngay }),
        s.amLich ? el("p", { className: "am-lich", textContent: s.amLich }) : null,
        el("p", { className: "dia-diem", textContent: s.diaDiem }),
        el("p", { textContent: s.diaChi }),
        s.banDo ? el("a", { href: s.banDo, target: "_blank", rel: "noopener", textContent: "Chỉ đường" }) : null
      )
    );
  });

  // ---- Chuyện tình ----
  if (!D.chuyenTinhYeu || !D.chuyenTinhYeu.length) $("#khoi-chuyen").remove();
  else D.chuyenTinhYeu.forEach((m) => {
    $("#chuyen").append(el("div", { className: "moc hien" },
      el("b", { textContent: m.moc }), el("h4", { textContent: m.tieuDe }), el("p", { textContent: m.noiDung })));
  });

  // ---- Album + xem phóng to ----
  const lb = $("#lightbox"), lbImg = lb.querySelector("img");
  let viTri = 0;
  const moAnh = (i) => { viTri = (i + D.album.length) % D.album.length; lbImg.src = D.album[viTri]; lb.hidden = false; };
  D.album.forEach((src, i) => {
    const img = el("img", { src, alt: "Ảnh cưới " + (i + 1), loading: "lazy", className: "hien" });
    img.onclick = () => moAnh(i);
    $("#album").append(img);
  });
  lb.querySelector(".lb-dong").onclick = () => (lb.hidden = true);
  lb.querySelector(".lb-truoc").onclick = () => moAnh(viTri - 1);
  lb.querySelector(".lb-sau").onclick = () => moAnh(viTri + 1);
  lb.onclick = (e) => { if (e.target === lb) lb.hidden = true; };
  let xBatDau = 0;
  lb.addEventListener("touchstart", (e) => (xBatDau = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - xBatDau;
    if (Math.abs(dx) > 50) moAnh(viTri + (dx < 0 ? 1 : -1));
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") moAnh(viTri - 1);
    if (e.key === "ArrowRight") moAnh(viTri + 1);
  });

  // ---- Mừng cưới (QR VietQR) ----
  D.mungCuoi.forEach((m) => {
    const qr = `https://img.vietqr.io/image/${encodeURIComponent(m.nganHang)}-${encodeURIComponent(m.soTaiKhoan)}-compact2.png?accountName=${encodeURIComponent(m.chuTaiKhoan)}&addInfo=${encodeURIComponent("Mung cuoi")}`;
    const nut = el("button", { type: "button", textContent: "Sao chép số tài khoản" });
    nut.onclick = () => navigator.clipboard?.writeText(m.soTaiKhoan).then(() => (nut.textContent = "Đã sao chép ✓"));
    $("#mung-cuoi").append(el("div", { className: "the-qr hien" },
      el("h4", { textContent: "Mừng cưới " + m.danhCho }),
      el("img", { src: qr, alt: "Mã QR chuyển khoản", loading: "lazy" }),
      el("p", { textContent: `${m.nganHang} — ${m.soTaiKhoan}` }),
      el("p", { textContent: m.chuTaiKhoan }),
      nut));
  });

  // ---- Chân trang ----
  if (D.chanTrang) { $("#chan-trang").textContent = D.chanTrang.ten; $("#chan-trang").href = D.chanTrang.link; }

  // ---- Nhạc + mở thiệp ----
  const nhac = $("#nhac"), nutNhac = $("#nut-nhac");
  if (D.nhac) { nhac.src = D.nhac; nutNhac.hidden = false; }
  const phat = () => nhac.play().then(() => nutNhac.classList.add("dang-phat")).catch(() => {});
  nutNhac.onclick = () => { if (nhac.paused) phat(); else { nhac.pause(); nutNhac.classList.remove("dang-phat"); } };
  $("#nut-mo").onclick = () => { $("#phong-bi").classList.add("da-mo"); if (D.nhac) phat(); };

  // ---- Hiện dần khi cuộn ----
  const io = new IntersectionObserver((ds) => ds.forEach((d) => {
    if (d.isIntersecting) { d.target.classList.add("da-hien"); io.unobserve(d.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".hien").forEach((n) => io.observe(n));

  // ---- Lời chúc + RSVP (Google Sheets qua Apps Script) ----
  function hienLoiChuc(ds) {
    const khung = $("#loi-chuc");
    khung.textContent = "";
    ds.filter((x) => x.loiChuc).forEach((x) =>
      khung.append(el("div", { className: "the" }, el("b", { textContent: x.ten }), el("p", { textContent: x.loiChuc }))));
  }
  if (D.googleScriptUrl) {
    fetch(D.googleScriptUrl).then((r) => r.json()).then(hienLoiChuc).catch(() => {});
  }

  $("#form-rsvp").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target, kq = $("#ket-qua");
    const duLieu = Object.fromEntries(new FormData(f));
    duLieu.khach = khach || "";
    f.querySelector("button").disabled = true;
    kq.textContent = "Đang gửi...";
    try {
      if (D.googleScriptUrl) {
        await fetch(D.googleScriptUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(duLieu) });
      }
      kq.textContent = "Cảm ơn bạn! Cô dâu chú rể đã nhận được phản hồi.";
      if (duLieu.loiChuc) {
        $("#loi-chuc").prepend(el("div", { className: "the" }, el("b", { textContent: duLieu.ten }), el("p", { textContent: duLieu.loiChuc })));
      }
      f.reset();
    } catch {
      kq.textContent = "Gửi chưa được, bạn thử lại nhé.";
    }
    f.querySelector("button").disabled = false;
  };
})();
