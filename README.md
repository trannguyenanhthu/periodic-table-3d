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
| `physical-extra.js` | Độ âm điện Pauling và bán kính nguyên tử |
| `vendor/three.min.js` | three.js r128 (MIT), lưu local để chạy offline |

## Nguồn dữ liệu

Nguyên tử khối và đồng vị theo IUPAC/NUBASE2020; tên tiếng Việt đối chiếu Wikipedia tiếng Việt; dữ liệu vật lý lấy từ gói `mendeleev`. Người phát hiện và năm phát hiện được đối chiếu toàn bộ 118 nguyên tố với bảng tra cứu periodictable.one và Wikipedia "Timeline of chemical element discoveries" — ưu tiên người/cộng đồng **ghi nhận lần đầu** nguyên tố, không phải người cô lập kim loại về sau (ví dụ beryli: Vauquelin 1798; Wöhler và Bussy cô lập kim loại 1828, ghi trong ghi chú lịch sử). Ứng dụng thực tế được đối chiếu với chuyên trang Uses của WebElements (ví dụ bổ sung chất ức chế ăn mòn cho Tc, máy đo độ dày cho Pm, đèn hơi thủy ngân cho Sc); một số nguyên tố siêu nặng chỉ có ứng dụng nghiên cứu. Khối lượng riêng, điểm nóng chảy/sôi đã so sánh với bộ dữ liệu Wikipedia; khác biệt nhỏ thường do dạng thù hình hoặc điều kiện đo, nên giữ giá trị `mendeleev`. Độ âm điện và bán kính nguyên tử lấy từ `mendeleev`; ô trống nghĩa là chưa có giá trị đáng tin cho nguyên tố đó. Với nguyên tố từ thời cổ đại, năm ghi dạng "4000 BC". Phân loại của các nguyên tố siêu nặng là dự đoán theo nhóm. Mô hình 3D là mô phỏng Bohr đơn giản hóa, không phải đám mây electron lượng tử.

Đã tải và đối chiếu lần lượt trang *Uses* của WebElements cho cả 118 nguyên tố. Không phát hiện mục ứng dụng nào sai sự thật; bổ sung chi tiết cho Be (con quay hồi chuyển, hợp kim Be-Cu), La (pin NiMH, đèn carbon), Th (màn đèn Welsbach) và Np (máy dò neutron). Các nguyên tố từ Es trở đi được WebElements ghi là "không có ứng dụng"; website ghi trung thực là chỉ tổng hợp để nghiên cứu.

Đã tải trang tính chất vật lý và trang chính của WebElements cho cả 118 nguyên tố. Khối lượng riêng của chất rắn/lỏng khớp với dữ liệu hiện hành sai số rất nhỏ; với khí, website dùng **khối lượng riêng của khí ở điều kiện thường** còn WebElements nêu khối lượng riêng của thể rắn — đây là khác biệt về trạng thái, không phải sai số. Điểm nóng chảy/sôi được đối chiếu thêm với WebElements: một số giá trị lệch do niên độ dữ liệu và dạng thù hình (B, C, Si, Cu, Ce, Pr, Pm, Ac), nên giữ nguyên giá trị `mendeleev`. Độ âm điện Pauling đã được thay bằng giá trị WebElements cho 94 nguyên tố có số liệu (sửa các giá trị cũ của Tc, Lu, W, Au, Tl, Pb, U…); bán kính nguyên tử vẫn lấy từ `mendeleev`. Đã sửa mô tả tính chất của V (kim loại mềm, không phải cứng).

## GitHub Pages

Trang được công bố tại https://twotnguyen.github.io/periodic-table-3d/
