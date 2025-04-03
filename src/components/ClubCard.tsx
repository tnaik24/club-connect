import React from 'react';
import { SwipeableCard } from 'react-swipeable-cards';
import { Club } from '@/types/club';

interface ClubCardProps {
  club: Club;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onSwipeLeft, onSwipeRight }) => {
  return (
    <SwipeableCard
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Club Image */}
        <div className="relative h-48 w-full">
          <img
            src={club.imageUrl}
            alt={club.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {club.category}
            </span>
          </div>
        </div>

        {/* Club Info */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{club.name}</h2>
          <p className="text-gray-600 mb-4">{club.description}</p>
          
          {/* Additional Details */}
          <div className="space-y-2 mb-6">
            {club.meetingTimes && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {club.meetingTimes}
              </div>
            )}
            {club.location && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {club.location}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onSwipeLeft}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Skip
            </button>
            <button
              onClick={onSwipeRight}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </SwipeableCard>
  );
};

export default ClubCard; 