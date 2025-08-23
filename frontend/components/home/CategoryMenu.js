"use client";

import { useState } from "react";
import { BookCarousel } from "./BookCarousel"; // import component BookCarousel

export function CategoryMenu() {
  const categories = [
    'Khoa học viễn tưởng',
    'Kiến thức - Học thuật',
    'Phiêu lưu',
    'Tâm Lý – Kỹ Năng Sống',
    'Tiểu Thuyết – Văn Học',
    'Truyện Kiếm Hiệp'
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium
                ${selectedCategory === cat ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-200'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Hiển thị BookCarousel nếu đã chọn category */}
      {selectedCategory && (
        <BookCarousel
          title={`Thể loại: ${selectedCategory}`}
          category={selectedCategory} // truyền category vào BookCarousel
        />
      )}
    </>
  );
}
