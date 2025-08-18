"use client";
import { useState } from "react";
import { Footer } from "@/components/home/Footer";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Form gửi:", formData);
    alert("Cảm ơn bạn đã liên hệ!");
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
                <p>Số 2, đường Võ Oanh (D3 cũ), P.25, Q. Bình Thạnh, TP. HCM</p>
              </div>
              <div>
                <p className="font-semibold">E-MAIL</p>
                <p className="text-teal-600">lic@ut.edu.vn</p>
              </div>
              <div>
                <p className="font-semibold">PHONE</p>
                <p>(028) 35.126.169</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.193514111351!2d106.71326217573605!3d10.796640258814219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c57a8d7c2b%3A0x2d7a32e4b13d5f54!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBHaWFvIFRodeG7sWMgVMOgbSBI4buNYyBULlAuSENN!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
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
