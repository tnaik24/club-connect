/**
 * Represents a club's social media presence
 */
export interface ClubSocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

/**
 * Represents a user's profile
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    categories: string[];
    meetingTimes: string[];
    locations: string[];
    interests: string[];
  };
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