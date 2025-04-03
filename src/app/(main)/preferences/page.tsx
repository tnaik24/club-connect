'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPreferences } from '@/types/preferences';

const categories = ['Academic', 'Business', 'Community Service', 'Cultural', 'Sports', 'Arts'];
const locations = ['Fisher Student Center', 'Bello Center', 'Unistructure', 'Library', 'Gym'];
const interests = [
  'Programming', 'Technology', 'Analytics', 'Data', 'Environment', 'Sustainability',
  'Business', 'Finance', 'Marketing', 'Leadership', 'Sports', 'Art', 'Music',
  'Dance', 'Culture', 'Community Service', 'Research', 'Science', 'Engineering'
];

export default function PreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    categories: [] as string[],
    meetingTimes: [] as string[],
    locations: [] as string[],
    interests: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userProfile = {
      id: '1', // In a real app, this would come from authentication
      preferences: {
        categories: formData.categories,
        meetingTimes: formData.meetingTimes,
        locations: formData.locations,
        interests: formData.interests,
      },
      favorites: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    router.push('/matches');
  };

  const handleCheckboxChange = (field: keyof UserPreferences, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Club Preferences
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Select your preferences to find clubs that match your interests
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Categories Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferred Club Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={(e) => handleCheckboxChange('categories', category)}
                    className="h-4 w-4 text-bryant-blue focus:ring-bryant-blue border-gray-300 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Meeting Times Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferred Meeting Times
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                ['Morning', 'Afternoon', 'Evening'].map((time) => {
                  const meetingTime = `${day} ${time}`;
                  return (
                    <label
                      key={meetingTime}
                      className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={formData.meetingTimes.includes(meetingTime)}
                        onChange={(e) => handleCheckboxChange('meetingTimes', meetingTime)}
                        className="h-4 w-4 text-bryant-blue focus:ring-bryant-blue border-gray-300 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{meetingTime}</span>
                    </label>
                  );
                })
              ))}
            </div>
          </div>

          {/* Locations Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferred Locations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((location) => (
                <label
                  key={location}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.locations.includes(location)}
                    onChange={(e) => handleCheckboxChange('locations', location)}
                    className="h-4 w-4 text-bryant-blue focus:ring-bryant-blue border-gray-300 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Your Interests
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={(e) => handleCheckboxChange('interests', interest)}
                    className="h-4 w-4 text-bryant-blue focus:ring-bryant-blue border-gray-300 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!formData.categories.length || !formData.meetingTimes.length || !formData.locations.length || !formData.interests.length}
              className="bg-bryant-blue text-white px-8 py-3 rounded-lg hover:bg-bryant-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bryant-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find Matching Clubs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 