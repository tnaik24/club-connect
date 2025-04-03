'use client';

import { useState } from 'react';
import ClubCard from '@/components/ClubCard';
import { clubs } from '@/data/clubs';

export default function ClubsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedClubs, setLikedClubs] = useState<string[]>([]);

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeRight = () => {
    setLikedClubs((prev) => [...prev, clubs[currentIndex].id]);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= clubs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No more clubs to show!</h1>
          <p className="text-gray-600">
            You've liked {likedClubs.length} clubs. Check back later for more!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Discover Bryant Clubs
        </h1>
        <ClubCard
          club={clubs[currentIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </div>
    </div>
  );
} 