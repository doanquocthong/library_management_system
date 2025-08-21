import Link from "next/link";

export function Footer() {
    return (
      <footer
        className="relative text-white py-10 px-6 mt-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/uth.jpg')" }}
      >
        {/* Lớp phủ tối mờ để dễ đọc chữ */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>
  
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Logo và tiêu đề bên trái */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/logo-uth.png" alt="Logo Thư Viện Sách" className="w-32 h-auto rounded-lg" />
              <h2 className="text-xl font-semibold text-white">Thư Viện UTH</h2>
            </Link>
          </div>
  
          {/* Nội dung phần mô tả */}
          <div className="text-left space-y-4">
            <p className="text-sm">
              Nơi bạn có thể đọc, chia sẻ và khám phá hàng ngàn đầu sách miễn phí thuộc nhiều thể loại khác nhau, mọi lúc, mọi nơi.
            </p>
            <p className="text-sm leading-relaxed">
              Thư viện UTH là thư viện số dành cho mọi người yêu sách, nơi bạn có thể khám phá, tìm đọc và tải về hàng ngàn đầu sách điện tử (ebook) 
              và tài liệu giấy hoàn toàn miễn phí. Chúng tôi giới thiệu đa dạng các thể loại sách, từ văn học, kỹ năng sống, kinh doanh đến khoa học, công nghệ và sách học tập. 
              Với mong muốn lan toả văn hóa đọc, Thư viện UTH không chỉ là kho sách miễn phí, mà còn là điểm dừng chân lý tưởng cho những ai đang tìm kiếm tri thức và cảm hứng mỗi ngày.
            </p>
            <p className="text-xs text-gray-300">
              © 2025 Thư viện UTH. Bản quyền thuộc về Trường Đại học GTVT HCM. Mọi quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    );
  }
