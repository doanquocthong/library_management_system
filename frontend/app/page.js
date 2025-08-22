'use client';
import {HeroBanner} from '@/components/home/HeroBanner';
import {BookCarousel} from '@/components/home/BookCarousel';
import {BlogPreview} from '@/components/home/BlogPreview';
import {Footer} from '@/components/home/Footer';
import {Header} from '@/components/home/header';
import SearchBar from '@/components/home/SearchBar';
import { useState } from 'react';
import { CategoryMenu } from '@/components/home/CategoryMenu';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Tìm kiếm:', query);
    // TODO: gọi api hoặc lọc danh sách ở đây
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
        <HeroBanner />
        <CategoryMenu />
        <BookCarousel title="Sách nổi bật" filterPopular={true} />
        <BookCarousel title="Tất cả sách" filterPopular={false} />
        <BlogPreview />
      </div>
      <Footer />
    </div>
  );
}