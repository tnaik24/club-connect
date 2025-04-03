'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ClubSwiper from '@/components/clubs/ClubSwiper';
import SearchBar from '@/components/search/SearchBar';
import { useClubs } from '@/lib/hooks/useClubs';
import { Club } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { clubs, isLoading, error } = useClubs({
    search: searchQuery,
  });

  const handleSwipeLeft = (clubId: string) => {
    // Handle skip
    console.log('Skipped club:', clubId);
  };

  const handleSwipeRight = (clubId: string) => {
    // Handle like
    console.log('Liked club:', clubId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-bryant-blue dark:text-bryant-blue-light mb-4">
            Discover Bryant Clubs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Swipe right to like, left to skip
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <ClubSwiper
          clubs={clubs}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 