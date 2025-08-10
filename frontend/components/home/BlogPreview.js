export function BlogPreview() {
    return (
      <section className="py-12 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">Bài viết mới</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tin tức #{i}</h3>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <a href="#" className="text-indigo-600 text-sm font-medium mt-2 inline-block">Xem thêm →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }