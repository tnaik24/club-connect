import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeableCard } from 'react-swipeable-cards';
import { Club } from '@/types/club';
import ClubCard from './ClubCard';

interface ClubSwiperProps {
  clubs: Club[];
  onSwipeLeft: (clubId: string) => void;
  onSwipeRight: (clubId: string) => void;
  isLoading?: boolean;
}

/**
 * A Tinder-style swiper component for clubs with animations
 */
export default function ClubSwiper({
  clubs,
  onSwipeLeft,
  onSwipeRight,
  isLoading = false,
}: ClubSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < clubs.length) {
      onSwipeLeft(clubs[currentIndex].id);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < clubs.length) {
      onSwipeRight(clubs[currentIndex].id);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-700" />
          <div className="p-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= clubs.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          No more clubs to show!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for more clubs or adjust your preferences.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={clubs[currentIndex].id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <SwipeableCard
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            className="w-full"
          >
            <ClubCard
              club={clubs[currentIndex]}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </SwipeableCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 