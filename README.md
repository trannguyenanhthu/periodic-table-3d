# Bảng tuần hoàn hóa học 3D

Website tương tác tentang 118 nguyên tố hóa học: bảng tuần hoàn màu theo nhóm, mô hình nguyên tử 3D bằng three.js, tìm kiếm, lọc theo nhóm và thông tin chi tiết từng nguyên tố.

## Tính năng

- 118 ô nguyên tố có thể bấm; bảng nằm bên trái, thanh thông tin bên phải.
- Mô hình nguyên tử 3D: hạt nhân, quỹ đạo và electron, tự xoay và kéo chuột để xoay.
- Tìm kiếm theo tên tiếng Anh, tên tiếng Việt, ký hiệu hoặc số nguyên tử; `Enter` chọn kết quả đầu tiên.
- Lọc theo 10 nhóm hóa học; lọc và tìm kiếm dùng đồng thời.
- Thông tin mỗi nguyên tố: khối lượng nguyên tử, khối lượng riêng, điểm nóng chảy/sôi, người và năm phát hiện, proton/neutron/electron, đồng vị dùng để tính neutron, nhóm, chu kỳ, trạng thái, cấu hình lớp electron, tính chất, ứng dụng và hình minh họa.
- Giao diện đáp ứng; trên mobile bảng chiếm toàn màn hình, bấm một nguyên tố sẽ mở màn hình chi tiết toàn màn hình (có nút quay lại), như bảng tuần hoàn 3D của Google.
- Chế độ tối/sáng có nút chuyển đổi và được lưu trong trình duyệt.
- Dùng mũi tên trái/phải để chuyển nguyên tố; thanh thông tin có thể thu gọn trên desktop.

## Chạy locally

Mở trực tiếp `index.html` trong trình duyệt. Không cần cài đặt hay build; thư viện three.js đã được lưu trong `vendor/`.

Nếu muốn chạy qua máy chủ tĩnh:

```bash
python3 -m http.server 8000
```

Sau đó truy cập `http://localhost:8000`.

## Cấu trúc

| Tệp | Nội dung |
| --- | --- |
| `index.html`, `styles.css` | Bố cục và giao diện |
| `app.js` | Tương tác, bộ lọc, tìm kiếm, dựng scene three.js |
| `elements.js` | Dữ liệu cơ bản của 118 nguyên tố |
| `details.js` | Tên tiếng Việt, đồng vị tính neutron, ứng dụng |
| `physics.js` | Cấu hình electron, khối lượng riêng, điểm nóng chảy/sôi, người phát hiện |
| `enrich.js`, `illustrations.js` | Tính chất và biểu tượng SVG minh họa ứng dụng |
| `vendor/three.min.js` | three.js r128 (MIT), lưu local để chạy offline |

## Nguồn dữ liệu

Nguyên tử khối và đồng vị theo IUPAC/NUBASE2020; tên tiếng Việt đối chiếu Wikipedia tiếng Việt; dữ liệu vật lý lấy từ gói `mendeleev`. Mô hình 3D là mô phỏng Bohr đơn giản hóa, không phải đám mây electron lượng tử.

## GitHub Pages

Trang được công bố tại https://twotnguyen.github.io/periodic-table-3d/
