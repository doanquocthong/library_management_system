'use client';
import { HeroBanner } from '@/components/home/HeroBanner';
import SearchBar from '@/components/home/SearchBar';
import { BookCarousel } from '@/components/home/BookCarousel';
import { BlogPreview } from '@/components/home/BlogPreview';
import { Footer } from '@/components/home/Footer';
import { Header } from '@/components/home/header';
import { useState } from 'react';
import { CategoryMenu } from '@/components/home/CategoryMenu';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      <HeroBanner />
      <CategoryMenu />
      {searchQuery ? (
        <BookCarousel
          title={`Kết quả tìm kiếm: "${searchQuery}"`}
          filterPopular={false}
          searchQuery={searchQuery}
        />
      ) : (
        <>
          <BookCarousel title="Sách nổi bật" filterPopular={true} />
          <BookCarousel title="Tất cả sách" filterPopular={false} />
        </>
      )}
      <Footer />
    </div>
  );
}
