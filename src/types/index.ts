/**
 * Represents a club's social media presence
 */
export interface ClubSocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

/**
 * Represents a user's preferences for club matching
 */
export interface UserPreferences {
  categories: string[];
  meetingTimes: string[];
  locations: string[];
  interests: string[];
}

/**
 * Represents a user's profile
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  favorites: string[]; // Array of club IDs
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a club in the system
 */
export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  meetingTimes?: string;
  location?: string;
  contactEmail?: string;
  website?: string;
  socialMedia?: ClubSocialMedia;
  tags: string[];
  memberCount?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a match between a user and a club
 */
export interface ClubMatch {
  clubId: string;
  userId: string;
  score: number;
  reasons: string[];
  createdAt: string;
}

/**
 * Represents the response from the AI matching service
 */
export interface MatchResponse {
  matches: ClubMatch[];
  totalClubs: number;
  processingTime: number;
}

/**
 * Represents the state of a voice search session
 */
export interface VoiceSearchState {
  isListening: boolean;
  transcript: string;
  error: string | null;
}

/**
 * Represents the props for a swipeable card component
 */
export interface SwipeableCardProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
  className?: string;
} 