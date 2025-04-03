import { NextResponse } from 'next/server';
import { matchClubsWithUser } from '@/lib/ai/matching';
import { UserProfile } from '@/types/club';

/**
 * POST /api/match
 * Matches clubs with a user's profile using AI
 */
export async function POST(request: Request) {
  try {
    const userProfile: UserProfile = await request.json();

    // Validate user profile
    if (!userProfile.id || !userProfile.preferences) {
      return NextResponse.json(
        { error: 'Invalid user profile' },
        { status: 400 }
      );
    }

    // Get clubs from the data source
    const { clubs } = await import('@/data/clubs');

    // Get AI matches
    const matches = await matchClubsWithUser(clubs, userProfile);

    // Sort matches by score
    matches.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      matches,
      totalClubs: clubs.length,
      processingTime: Date.now(),
    });
  } catch (error) {
    console.error('Error matching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to match clubs' },
      { status: 500 }
    );
  }
} 