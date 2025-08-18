import { Footer } from "@/components/home/Footer";

const milestones = [
  {
    year: "1991",
    color: "bg-blue-600",
    content:
      "Thư viện Trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh được thành lập trực thuộc Phòng Đào tạo của Phân hiệu Đại học Hàng hải.",
  },
  {
    year: "1998",
    color: "bg-emerald-500",
    content:
      "là Tổ Thư viện trực thộc Phòng Khoa học – Công nghệ (Phòng Đào tạo tách ra).",
  },
  {
    year: "2001",
    color: "bg-amber-400",
    content:
      "Hiệu trưởng đã ban hành Quyết định số 41/TCCB với tên gọi Tổ Thư viện trực thuộc trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh.",
  },
  {
    year: "2011",
    color: "bg-rose-500",
    content:
      "Hiệu trưởng ban hành Quyết định số 480/QĐ/ĐH GTVT thay đổi tên gọi Tổ Thư viện thành Thư viện trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh.",
  },
  {
    year: "2014",
    color: "bg-indigo-600",
    content:
      "Hiệu trưởng ban hành Quyết định số 235/QĐ/ĐH GTVT thành lập Trung tâm Dữ liệu và Công nghệ thông tin.",
  },
  {
    year: "2021",
    color: "bg-teal-600",
    content:
      "Sáp nhập 2 đơn vị là Thư viện và Trung tâm Dữ liệu và CNTT theo quyết định số 856/QĐ-ĐHGTVT của hiệu trưởng ngày 09 tháng 12 năm 2021 thành Trung tâm Thông tin – Thư viện."
  },
];

function TimelineItem({ item, side, index }) {
  return (
    <div className="relative flex items-center justify-between w-full">
      {side === "left" ? (
        <div className="w-[46%]">
          <div className={`rounded-xl text-white shadow-lg ${item.color}`}>
            <div className="p-5">
              <p className="leading-relaxed text-sm sm:text-base">{item.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[46%]" />
      )}

      <div className="relative flex items-center justify-center w-[8%]">
        <div className="relative z-10 w-11 h-11 rounded-full bg-emerald-500 ring-2 ring-emerald-300 border-4 border-white shadow flex items-center justify-center text-white font-semibold">
          <span className="sr-only">Mốc {index + 1}</span>
          {index + 1}
        </div>
      </div>

      {side === "right" ? (
        <div className="w-[46%]">
          <div className={`rounded-xl text-white shadow-lg ${item.color}`}>
            <div className="p-5">
              <p className="leading-relaxed text-sm sm:text-base">{item.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[46%]" />
      )}
    </div>
  );
}

export default function IntroducePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section
        className="relative h-56 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/librarybanner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
            LỊCH SỬ HÌNH THÀNH
          </h1>
          <p className="mt-3 text-white/90 text-sm sm:text-base max-w-3xl">
            Quá trình hình thành và các giai đoạn phát triển trong từng giai đoạn của Thư viện UTH.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="relative space-y-12">
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full border-l-2 border-emerald-300 border-dashed" />
          {milestones.map((m, idx) => (
            <TimelineItem key={m.year} item={m} side={idx % 2 === 0 ? "left" : "right"} index={idx} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

