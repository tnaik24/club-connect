import { NextResponse } from 'next/server';
import { clubs } from '@/data/clubs';

/**
 * GET /api/clubs
 * Returns filtered clubs based on query parameters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',');

    let filteredClubs = [...clubs];

    // Filter by category
    if (category) {
      filteredClubs = filteredClubs.filter(club => club.category === category);
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClubs = filteredClubs.filter(club => 
        club.name.toLowerCase().includes(searchLower) ||
        club.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by tags
    if (tags?.length) {
      filteredClubs = filteredClubs.filter(club => 
        club.tags.some(tag => tags.includes(tag))
      );
    }

    // Add cache headers
    const response = NextResponse.json({
      clubs: filteredClubs,
      total: filteredClubs.length,
    });

    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    return response;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
} 