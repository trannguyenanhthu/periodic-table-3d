# Bảng tuần hoàn hóa học 3D

Website tương tác về 118 nguyên tố hóa học, lấy bố cục và màu sắc theo ảnh sách `Bang-tuan-hoan-hoa-hoc.png`, kèm mô hình nguyên tử 3D kiểu Bohr bằng three.js. Chạy hoàn toàn trên trình duyệt, không cần build hay cài đặt.

## Tính năng

### Bảng tuần hoàn

- 118 ô có thể bấm, xếp theo đúng bố cục sách: tiêu đề `BẢNG TUẦN HOÀN CÁC NGUYÊN TỐ HOÁ HỌC(*)`, hàng `Cột →` (1–18) và `Nhóm →` (IA–VIIIA), cột `Chu kỳ ↓` (1–7), hai hàng lanthanide/actinide có nhãn `* lanthanides` / `** actinides`.
- Mỗi ô hiện số hiệu, ký hiệu, tên tiếng Việt và khối lượng; dải cấu hình hóa trị (`ns²`, `ns²np⁶`, `(n−1)d⁵ns¹`…) nằm trong hộp riêng phía trên ô. Riêng H để trắng và Ge/Sb/Ts tô xanh theo đúng ảnh sách.
- Bốn màu chủ đề: **Kim loại** (xanh), **Kim loại chuyển tiếp** (vàng), **Phi kim** (đỏ), **Khí hiếm** (xanh lá). Chú thích 4 ô nằm cạnh khối "Một số cấu hình electron đặc biệt" (Nb, Ru, Rh, Pd, W, Pt) và dòng nguồn ở footer.
- Bấm một nguyên tố: ô đó được đóng khung và một ô phóng to hiện cố định trong vùng trống giữa bảng, với các mũi tên chỉ đúng vào cấu hình, số hiệu, ký hiệu, tên và nguyên tử khối trung bình — giống chú thích Be trong sách.
- Lọc theo 4 tab màu. Bấm lại tab đang active hoặc bấm vào khoảng trống của bảng để bỏ lọc. Bộ lọc dựa theo **màu hiển thị của ô**, nên các ô xanh Ge/Sb/Ts thuộc "Kim loại".
- Tìm kiếm theo tên tiếng Anh, tên tiếng Việt, ký hiệu hoặc số nguyên tử; `Enter` chọn kết quả đầu tiên, `Escape` xóa nội dung tìm kiếm. Lọc và tìm kiếm dùng đồng thời.
- Mũi tên trái/phải chuyển nguyên tố; `×` ở thanh trên quay lại nguyên tố đầu tiên; `›` thu gọn thanh thông tin trên desktop.

### Mô hình nguyên tử 3D

- Hạt nhân, các vòng quỹ đạo và electron **xanh lá**. Mỗi vòng dao động nghiêng bất quy tắc với cùng thông số (tần số, biên độ), chỉ khác pha — nhìn rời rạc nhưng không dính vào nhau.
- Kéo chuột hoặc một ngón tay để xoay mô hình; cuộn chuột, nút `−`/`+` hoặc chụp hai ngón tay để phóng to/thu nhỏ.
- Nút dừng/phát (`❚❚` / `▶`). Khi dừng, từng vòng và electron **từ từ chậm lại rồi khớp thành các vòng tròn đồng tâm nhìn chính diện**, giữ nguyên góc người dùng đang xem, để dễ đếm số vòng và số hạt. Bấm tiếp tục thì các vòng từ từ phân rã lại và chuyển động bất quy tắc như cũ.
- Trên desktop, nút `⤢` góc trên phải đưa panel thông tin ra giữa màn hình có nền mờ; bấm lại, bấm nền hoặc `Esc` để thu về.
- Mỗi lần đổi nguyên tố, toàn bộ trạng thái xem được reset: zoom về 1, chế độ chuyển động, góc xoay và panel phóng to về mặc định.

### Thông tin từng nguyên tố

Khối lượng nguyên tử và khối lượng riêng, điểm nóng chảy/sôi, độ âm điện Pauling, bán kính nguyên tử, người và năm phát hiện, số proton/neutron/electron (kèm đồng vị dùng để tính neutron), nhóm, chu kỳ, phân loại, trạng thái ở 25 °C, cấu hình lớp electron, tính chất tiêu biểu, ứng dụng thực tế kèm biểu tượng SVG và ghi chú lịch sử phát hiện khi có.

### Giao diện

- Chế độ sáng/tối có nút chuyển, lưu trong `localStorage`. Ở chế độ tối chỉ nền chuyển đen — màu các ô nguyên tố giữ nguyên như khi sáng; theme được áp dụng ngay trong `<head>` để tránh chớp trắng lúc tải.
- Trên mobile: bảng cuộn ngang, bấm một nguyên tố mở màn hình chi tiết toàn màn hình trượt từ phải sang; mũi tên `←` ở thanh trên trượt ngược sang trái để quay lại. Vùng 3D chiếm toàn chiều ngang màn hình.
- Nút chia sẻ sao chép liên kết hiện tại vào clipboard, có toast thông báo.

## Chạy locally

Mở trực tiếp `index.html` trong trình duyệt. Không cần cài đặt hay build; three.js được lưu trong `vendor/`.

Hoặc chạy máy chủ tĩnh:

```bash
cd periodic-table-3d
python3 -m http.server 8000
```

Rồi truy cập `http://localhost:8000`.

Các tệp tĩnh dùng query `?v=18` để tránh cache cũ. Khi sửa CSS/JS, tăng số này ở tất cả các tag trong `index.html`.

## Cấu trúc

| Tệp | Nội dung |
| --- | --- |
| `index.html` | Cấu trúc thanh công cụ, bảng, footer, panel thông tin và các điều khiển 3D |
| `styles.css` | Bố cục lưới 18 cột, màu 4 nhóm, chú thích, responsive mobile và dark mode |
| `app.js` | Tương tác: lọc, tìm kiếm, chú thích, dựng scene three.js, chuyển động/zoom/pause, slide mobile |
| `elements.js` | Dữ liệu cơ bản của 118 nguyên tố (ký hiệu, tên, khối lượng, nhóm, chu kỳ…) |
| `details.js` | Tên tiếng Việt, số khối đồng vị, ứng dụng, tập hợp nguyên tố phóng xạ và ghi chú lịch sử |
| `physics.js` | Cấu hình lớp electron, khối lượng riêng, điểm nóng chảy/sôi, người và năm phát hiện |
| `enrich.js`, `illustrations.js` | Tính chất tiêu biểu và biểu tượng SVG minh họa ứng dụng |
| `physical-extra.js` | Độ âm điện Pauling và bán kính nguyên tử |
| `vendor/three.min.js` | three.js r128 (MIT), lưu local để chạy offline |
| `Bang-tuan-hoan-hoa-hoc.png` | Ảnh sách làm chuẩn cho bố cục, màu sắc và chú thích |

## Nguồn dữ liệu

Khối lượng nguyên tử và đồng vị theo IUPAC/NUBASE2020; tên tiếng Việt đối chiếu Wikipedia tiếng Việt; dữ liệu vật lý lấy từ gói `mendeleev`. Người phát hiện và năm phát hiện được đối chiếu với periodictable.one và Wikipedia "Timeline of chemical element discoveries" — ưu tiên người/cộng đồng **ghi nhận lần đầu**, không phải người cô lập kim loại về sau (ví dụ beryli: Vauquelin 1798; Wöhler và Bussy cô lập kim loại 1828, ghi trong ghi chú lịch sử; actini: Debierne 1899).

Ứng dụng thực tế đối chiếu với chuyên trang Uses của WebElements; một số nguyên tố siêu nặng chỉ có ứng dụng nghiên cứu. Khối lượng riêng, điểm nóng chảy/sôi đã so sánh với Wikipedia; khác biệt nhỏ thường do dạng thù hình hoặc điều kiện đo, nên giữ giá trị `mendeleev`. Với khí, website dùng khối lượng riêng của khí ở điều kiện thường. Độ âm điện Pauling lấy theo WebElements cho 94 nguyên tố có số liệu; bán kính nguyên tử lấy từ `mendeleev`. Ô trống nghĩa là chưa có giá trị đáng tin. Với nguyên tố từ thời cổ đại, năm ghi dạng "4000 BC". Phân loại của các nguyên tố siêu nặng là dự đoán theo nhóm; khối lượng riêng của chúng là giá trị dự đoán, đã ghi rõ trong giao diện. Mô hình 3D là mô phỏng Bohr đơn giản hóa, không phải đám mây electron lượng tử.

Bố cục, bảng màu, dải cấu hình và phần cấu hình đặc biệt theo ảnh sách `Bang-tuan-hoan-hoa-hoc.png`; cách chuyển động của quỹ đạo tham khảo bảng tuần hoàn 3D của Google Arts & Experiments.

## GitHub Pages

Trang được công bố tại https://twotnguyen.github.io/periodic-table-3d/
