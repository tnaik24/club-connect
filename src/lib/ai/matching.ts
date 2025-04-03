import { Club, UserProfile, ClubMatch } from '@/types';

function calculateMatchScore(club: Club, userProfile: UserProfile): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Category match (30 points)
  if (userProfile.preferences.categories.includes(club.category)) {
    score += 30;
    reasons.push(`Matches your preferred category: ${club.category}`);
  }

  // Meeting time match (20 points)
  if (club.meetingTimes && Array.isArray(club.meetingTimes)) {
    const matchingTimes = club.meetingTimes.filter((time: string) => 
      userProfile.preferences.meetingTimes.some(prefTime => 
        time.toLowerCase().includes(prefTime.toLowerCase())
      )
    );
    if (matchingTimes.length > 0) {
      score += 20;
      reasons.push(`Meets at your preferred times: ${matchingTimes.join(', ')}`);
    }
  }

  // Location match (20 points)
  if (club.location && userProfile.preferences.locations.includes(club.location)) {
    score += 20;
    reasons.push(`Located at your preferred location: ${club.location}`);
  }

  // Interest match (30 points)
  if (club.tags && Array.isArray(club.tags)) {
    const matchingInterests = club.tags.filter(tag => 
      userProfile.preferences.interests.some(interest => 
        tag.toLowerCase().includes(interest.toLowerCase())
      )
    );
    if (matchingInterests.length > 0) {
      score += 30;
      reasons.push(`Matches your interests: ${matchingInterests.join(', ')}`);
    }
  }

  // Normalize score to 0-100
  score = Math.min(100, Math.round(score));

  return { score, reasons };
}

export async function matchClubsWithUser(
  clubs: Club[],
  userProfile: UserProfile
): Promise<ClubMatch[]> {
  try {
    // Calculate scores for all clubs
    const allMatches = clubs.map(club => {
      const { score, reasons } = calculateMatchScore(club, userProfile);
      return {
        clubId: club.id,
        userId: userProfile.id,
        score,
        reasons,
        createdAt: new Date().toISOString()
      };
    });

    // Sort by score in descending order and take top 3
    const topMatches = allMatches
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Only return matches with a score greater than 0
    return topMatches.filter(match => match.score > 0);
  } catch (error) {
    console.error('Error matching clubs:', error);
    throw new Error('Failed to match clubs with user profile');
  }
} 