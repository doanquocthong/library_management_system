'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/Footer';
import { Star, BookOpen, Heart, Calendar, User, Tag } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function BookDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const id = params?.id;

  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(4.5); // still a UI state (API chưa trả)
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState('');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8080/api/books/${id}`);
        if (!res.ok) throw new Error(`Lỗi khi tải sách: ${res.status}`);
        const data = await res.json();
        console.log('📚 Book API response:', data);
        if (mounted) setBook(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || 'Lỗi không xác định');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBook();

    return () => {
      mounted = false;
    };
  }, [id]);

  const formatPrice = (p) => {
    if (p == null || p === '') return '—';
    const n = Number(p);
    return isNaN(n) ? `${p} đ` : `${n.toLocaleString('vi-VN')} đ`;
  };

  const handleBorrow = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để mượn sách!');
      return;
    }
    alert('Đã gửi yêu cầu mượn sách!');
  };

  const handleSubmitReview = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá!');
      return;
    }
    if (userRating === 0) {
      alert('Vui lòng chọn số sao!');
      return;
    }
    alert('Cảm ơn bạn đã đánh giá!');
    setShowReviewForm(false);
    setReview('');
    setUserRating(0);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">Đang tải dữ liệu sách...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-600">
          Lỗi: {error}
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-700">
          Không tìm thấy sách.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Trang chủ</span>
          <span className="mx-2">/</span>
          <span>Sách</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{book.bookName}</span>
        </nav>

        {/* Book detail */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md object-cover"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-500'} shadow-md hover:scale-110 transition`}
                    aria-label="like"
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.bookName}</h1>
                  <p className="text-lg text-gray-600 mb-1">Tác giả: {book.author}</p>
                  <p className="text-sm text-gray-500">Mã sách: #{book.id}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-semibold text-indigo-700">{formatPrice(book.price)}</div>
                  {book.isPopular && (
                    <div className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      Phổ biến
                    </div>
                  )}
                </div>
              </div>

              {/* rating (UI only) */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* metadata */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Thể loại: {book.categoryName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Giá: {formatPrice(book.price)}</span>
                </div>
              </div>

              {/* actions */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Trạng thái:</span>{' '}
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${book.isPopular ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {book.isPopular ? 'Được quan tâm' : 'Bình thường'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBorrow}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  Mượn sách
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
