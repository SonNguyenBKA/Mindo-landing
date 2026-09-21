# Mindo — Landing page

Landing page cho Mindo, dựng theo thiết kế Figma _"Mindo · Landing page v2"_ và
_"Mindo · Liên hệ"_.

**Công nghệ:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP 3 · Zod

## Nguồn thiết kế

Figma file `oneBH6QD5NcZD7fxNeKEkn`:

- Trang chủ — node [`1368-120`](https://www.figma.com/design/oneBH6QD5NcZD7fxNeKEkn/Mindo?node-id=1368-120)
- Trang liên hệ — node [`1411-929`](https://www.figma.com/design/oneBH6QD5NcZD7fxNeKEkn/Mindo?node-id=1411-929)

Thiết kế dựng ở khung 1440px. Khi đối chiếu lại, lưu ý một số chỗ code đã chỉnh
có ý thức so với file gốc:

- Nút store ở CTA cuối nở theo nội dung (`min-w`) thay vì cố định 180px, để chữ
  "Google Play" không bị xuống dòng.
- Cụm từ "Điền biểu mẫu **bên cạnh**" đổi thành "**bên dưới**" ở mobile, vì biểu
  mẫu không còn nằm cạnh cột chữ.
- FAQ mở sẵn cả 5 hàng đúng như design (mọi hàng đều hiện dấu trừ), nhưng có thể
  bấm để thu gọn.

---

## Chạy dự án

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # build production (Turbopack)
npm start       # chạy bản đã build
npm run lint    # ESLint
```

Yêu cầu Node.js ≥ 20.9.

---

## Cấu trúc

```
src/
├── app/
│   ├── layout.tsx              # font, metadata, Header + Footer, cờ chống nháy nội dung
│   ├── page.tsx                # trang chủ — ghép 8 section
│   ├── globals.css             # design token + utility + animation nền
│   ├── icon.svg, apple-icon.png
│   ├── robots.ts, sitemap.ts
│   ├── lien-he/page.tsx        # trang liên hệ
│   └── api/contact/route.ts    # nhận biểu mẫu liên hệ
│
├── components/
│   ├── layout/                 # Header (có menu mobile), Footer
│   ├── sections/
│   │   ├── home/               # Hero, Capabilities, AiAssistant, News,
│   │   │                       # MindoPeer, ThreeSteps, Messaging, FinalCta
│   │   └── contact/            # ContactHero, ContactChannels,
│   │                           # ContactFormSection (+ ContactForm), ContactFaqSection
│   ├── motion/                 # lớp animation: Reveal, MaskedLines, Float,
│   │                           # Parallax, CountUp, SmoothScrollProvider
│   ├── bg/                     # nền vũ trụ: StarField, ShootingStars, TechGrid, Glow/Nebula
│   └── ui/                     # Logo, Badge, Button, PhoneFrame, SignalRings,
│                               # SectionHeading, Sparkline, ScaledStage, Icons
└── lib/
    ├── gsap.ts                 # đăng ký plugin, kiểm tra prefers-reduced-motion
    ├── contact-schema.ts       # schema Zod dùng chung client + server
    └── random.ts               # PRNG có hạt giống cho nền sao
```

---

## Design token

Khai báo trong `src/app/globals.css` (khối `@theme`), dùng như class Tailwind
bình thường (`bg-space`, `text-haze`, …).

| Token                        | Giá trị   | Dùng cho                       |
| ---------------------------- | --------- | ------------------------------ |
| `space` / `space-deep`       | `#04122a` / `#020d1e` | nền section tối / footer |
| `mist` / `mist-cool`         | `#f5f7fa` / `#f0f4fa` | nền section sáng      |
| `lime` / `lime-soft`         | `#b4d001` / `#cfe24a` | màu thương hiệu, CTA  |
| `ink`                        | `#08182f` | chữ trên nút lime              |
| `snow` / `haze` / `slate-dim`| `#f2f6fb` / `#9fb0c6` / `#617084` | chữ trên nền tối |

Chữ: **Be Vietnam Pro** (`next/font/google`, có subset `vietnamese`).

Hai container: `container-mindo` (lề 144px) cho hầu hết section và
`container-hero` (lề 112px) cho hero — đúng theo hai độ rộng trong Figma.

---

## Lớp animation

Tất cả animation đi qua các component trong `components/motion/`:

| Component      | Việc nó làm                                                   |
| -------------- | ------------------------------------------------------------- |
| `Reveal`       | hiện một khối khi cuộn tới (fade + trượt)                     |
| `RevealStagger`| hiện lần lượt các con `RevealItem` bằng **một** ScrollTrigger |
| `MaskedLines`  | tiêu đề chạy lên từng dòng, bị cắt bởi khung bao              |
| `Float`        | trôi lơ lửng vô hạn (cụm điện thoại, thẻ Peer, chip)          |
| `Parallax`     | dịch chuyển quầng sáng / tinh vân theo tiến độ cuộn           |
| `CountUp`      | đếm số khi cuộn tới                                           |

Nền trang trí (sao nhấp nháy, sao băng) dùng **animation CSS thuần**, không qua
GSAP — nhẹ hơn và tự tắt theo `prefers-reduced-motion`.

### Không để nội dung bị nháy, cũng không để bị ẩn vĩnh viễn

Phần tử sắp reveal cần ẩn sẵn, nhưng nếu ẩn bằng CSS vô điều kiện thì khi JS
lỗi/tắt nội dung sẽ mất hẳn. Cách xử lý:

- `<html>` được render sẵn class `mindo-motion` **ngay từ server** (không dùng
  script sửa DOM — sẽ gây lệch hydration với React).
- `html.mindo-motion [data-reveal] { opacity: 0 }` ẩn phần tử trước khi chạy.
- Hai đường thoát: thẻ `<noscript>` trong `layout.tsx` trả mọi thứ về trạng thái
  hiện khi không có JS, và media query `prefers-reduced-motion` làm điều tương tự.

---

## Biểu mẫu liên hệ

`POST /api/contact` — validate bằng Zod (`lib/contact-schema.ts`, dùng chung cho
client và server), giới hạn 5 lượt gửi thành công / 10 phút / IP.

| Mã  | Khi nào                        |
| --- | ------------------------------ |
| 200 | nhận thành công                |
| 400 | body không phải JSON hợp lệ    |
| 422 | dữ liệu sai — kèm `fieldErrors`|
| 429 | vượt giới hạn gửi              |

> **Chưa gửi email thật.** Hiện route chỉ `console.info` yêu cầu nhận được.
> Chỗ cần nối dịch vụ gửi mail được đánh dấu `TODO` trong
> `src/app/api/contact/route.ts` (có sẵn ví dụ dùng Resend). Định tuyến theo chủ
> đề: `Mindo Peer & đại lý` → `peer@mindo.vn`, còn lại → `hotro@mindo.vn`.

Bộ đếm rate limit nằm trong RAM của tiến trình, đủ cho một server đơn lẻ. Nếu
deploy nhiều instance hoặc lên serverless thì cần chuyển sang Redis/KV.

---

## Ảnh

Ảnh chụp màn hình app trong `public/phones/` và ảnh minh hoạ tin tức trong
`public/news/` được xuất từ Figma. Logo Mindo **không** dùng ảnh — được dựng lại
bằng SVG trong `components/ui/Logo.tsx` để luôn sắc nét và không mang theo nền
trắng khi đặt trên nền tối.

---

## Responsive

Thiết kế Figma chỉ có bản desktop 1440px; bố cục mobile và tablet được suy ra:
các cột gộp thành một, nav thu về menu mobile, type scale giảm bằng `clamp()`.

Các cụm dựng bằng toạ độ tuyệt đối (cụm điện thoại, thẻ Peer) đặt trong
`ScaledStage`: bên trong giữ đúng kích thước gốc theo Figma để mọi `top/left`
không lệch, bên ngoài thu nhỏ bằng `scale` **và** tính lại `width`/`height` —
vì `transform: scale()` không làm nhỏ ô mà phần tử chiếm trong layout, thiếu
bước này sẽ chừa ra một vùng trống lớn quanh cụm trên mobile.
