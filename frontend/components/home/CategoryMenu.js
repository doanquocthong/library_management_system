export function CategoryMenu() {
    const categories = ['Công nghệ', 'Kinh tế', 'Xây dựng', 'Giao thông', 'Tài liệu số'];
  
    return (
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-200 text-indigo-700 text-sm font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    );
  }
  