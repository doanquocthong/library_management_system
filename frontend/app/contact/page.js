"use client";
import { useState } from "react";
import { Footer } from "@/components/home/Footer";
import { API_URL } from "../../config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔑 Lấy userId từ localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      if (!userId) {
        alert("❌ Bạn cần đăng nhập trước khi gửi liên hệ.");
        console.log(userId)
        return;
      }

      const response = await fetch(`${API_URL}/supports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          title: formData.subject,
          content: formData.message,
          userId: parseInt(userId, 10), // ép về số
        }),
      });

      if (response.ok) {
        alert("📩 Gửi thành công!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const error = await response.text();
        alert("❌ Gửi thất bại: " + error);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      alert("❌ Không thể kết nối đến server.");
    }
  };


  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Banner */}
      <div
        className="relative h-56 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/banner-offices.jpg')" }}
      >
        <h1 className="text-3xl font-bold text-white px-6 py-2 rounded-lg">
          Liên hệ
        </h1>
      </div>

      {/* Nội dung chính */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-lg font-bold text-teal-700 mb-2">
              THÔNG TIN LIÊN HỆ
            </h2>
            <p className="text-gray-600 mb-6">
              Đừng ngần ngại, hãy liên hệ với chúng tôi ngay bây giờ nhé.
            </p>

            <div className="space-y-6 text-gray-700">
              <div>
                <p className="font-semibold">ĐỊA CHỈ</p>
                <p>02 Võ Oanh, Thạnh Lộc, Mỹ Tây, Hồ Chí Minh, Việt Nam</p>
              </div>
              <div>
                <p className="font-semibold">E-MAIL</p>
                <p className="text-teal-600">thongdoan742@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold">PHONE</p>
                <p>094 594 6668</p>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div>
            <h2 className="text-lg font-bold text-teal-700 mb-6">
              CÂU HỎI CỦA BẠN?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Địa chỉ email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Tiêu đề"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Nội dung"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded font-medium transition"
              >
                GỬI
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="w-full h-96 mt-10">
          <iframe
            src="https://www.google.com/maps?q=02+Vo+Oanh%2C+Thanh+Loc%2C+Ho+Chi+Minh%2C+Viet+Nam&output=embed"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
