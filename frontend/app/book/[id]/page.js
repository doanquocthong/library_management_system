'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/Footer';
import { Star, BookOpen, Heart, Calendar, User, Tag } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { API_URL } from "../../../config";
import BorrowForm from '@/components/BorrowForm';

export default function BookDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const id = params?.id;

  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(4.5); 
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); // ✅ danh sách review
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [borrowOpen, setBorrowOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/books/${id}`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
          }
        });
        if (!res.ok) throw new Error(`Lỗi khi tải sách: ${res.status}`);
        const data = await res.json();
        if (mounted) setBook(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Lỗi không xác định');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/reviews/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setReviews(data);
        }
      } catch (err) {
        console.error("Lỗi khi tải review:", err);
      }
    };

    fetchBook();
    fetchReviews();

    return () => { mounted = false; };
  }, [id]);

  const formatPrice = (p) => {
    if (p == null || p === '') return '—';
    const n = Number(p);
    return isNaN(n) ? `${p} đ` : `${n.toLocaleString('vi-VN')} đ`;
  };

  const handleBorrow = () => {
    const userId = user?.id || localStorage.getItem('userId');
    if (!userId) {
      alert('Vui lòng đăng nhập để mượn sách!');
      return;
    }
    if (!book?.id) {
      alert('Không tìm thấy sách để mượn!');
      return;
    }
    setBorrowOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá!');
      return;
    }
    if (!review.trim()) {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/reviews/user/${user.id}/book/${book.id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          bookname: book.bookName,
          comment: review,
        }),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi review");

      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setReview('');
      setShowReviewForm(false);
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (err) {
      alert("Không thể gửi review");
      console.error(err);
    }
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
        
        {/* ===================== BOOK DETAIL ===================== */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Hình ảnh */}
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
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thông tin sách */}
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

              {/* Rating UI */}
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

              {/* Metadata */}
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

              {/* Trạng thái */}
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
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Số lượng: {book.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Nút mượn sách */}
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

        {/* ===================== MÔ TẢ ===================== */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
          </div>
        </div>

        {/* ===================== REVIEWS ===================== */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Đánh giá</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-600">Chưa có đánh giá nào cho sách này.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => {
                const isOwner = user && r.userId === user.id; // ✅ kiểm tra user hiện tại có phải chủ bài review không
                return (
                  <div key={r.id} className="border-b pb-3">
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <User size={16} /> {r.userName}
                      {isOwner && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                          Bài của bạn
                        </span>
                      )}
                    </p>
                    <p className="text-gray-600">{r.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.reviewDate).toLocaleString("vi-VN")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Form thêm review */}
          <div className="mt-6">
            {showReviewForm ? (
              <div className="space-y-3">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm"
                  rows={3}
                  placeholder="Nhập đánh giá của bạn..."
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitReview}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Gửi đánh giá
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Viết đánh giá
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* ===================== Borrow Form Modal ===================== */}
      {borrowOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông tin mượn sách</h2>
            <BorrowForm
              userId={user?.id || localStorage.getItem('userId')}
              bookId={book?.id}
              bookTitle={book?.bookName || ''}
              isOpen={borrowOpen}
              onClose={() => setBorrowOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
