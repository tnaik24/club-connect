'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useClubs } from '@/lib/hooks/useClubs';
import { Club, ClubMatch } from '@/types';
import { useRouter } from 'next/navigation';
import { matchClubsWithUser } from '@/lib/ai/matching';
import { UserPreferences } from '@/types/preferences';

export default function MatchesPage() {
  const router = useRouter();
  const { clubs } = useClubs();
  const [matches, setMatches] = useState<ClubMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        // Get user profile from localStorage
        const userProfileStr = localStorage.getItem('userProfile');
        if (!userProfileStr) {
          // If no preferences are set, redirect to preferences page
          router.push('/preferences');
          return;
        }

        const userProfile = JSON.parse(userProfileStr);

        const response = await fetch('/api/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userProfile),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }

        const data = await response.json();
        setMatches(data.matches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatches();
  }, [router]);

  const matchedClubs = matches
    .map((match) => clubs.find((club) => club.id === match.clubId))
    .filter((club): club is Club => club !== undefined)
    .sort((a, b) => {
      const matchA = matches.find((m) => m.clubId === a.id);
      const matchB = matches.find((m) => m.clubId === b.id);
      return (matchB?.score || 0) - (matchA?.score || 0);
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bryant-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/preferences')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Preferences
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-bryant-blue dark:text-bryant-blue-light mb-4">
            Your Matched Clubs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your preferences and interests
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matchedClubs.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                No Matches Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any clubs that match your preferences. Try adjusting your preferences to find more matches.
              </p>
              <button
                onClick={() => router.push('/preferences')}
                className="bg-bryant-blue text-white px-6 py-2 rounded-lg hover:bg-bryant-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bryant-blue"
              >
                Update Preferences
              </button>
            </div>
          ) : (
            matchedClubs.map((club, index) => {
              const match = matches.find((m) => m.clubId === club.id);
              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="flex items-center p-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={club.imageUrl}
                        alt={club.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop';
                        }}
                      />
                      <div className="absolute -top-1 -right-1">
                        <span className="bg-bryant-blue text-white px-1.5 py-0.5 rounded-full text-[10px]">
                          {match?.score}% Match
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-grow text-center">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                        {club.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                        {club.description}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {Array.isArray(club.meetingTimes) ? club.meetingTimes.join(', ') : club.meetingTimes}
                      </div>
                      <div className="space-y-0.5">
                        {match?.reasons.map((reason, i) => (
                          <p
                            key={i}
                            className="text-xs text-gray-500 dark:text-gray-400"
                          >
                            • {reason}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 