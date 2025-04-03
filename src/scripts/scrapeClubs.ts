import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Club } from '@/types/club';

const ENGAGED_API_URL = 'https://engaged.bryant.edu/api/organizations';

async function scrapeClubs(): Promise<Club[]> {
  try {
    // Fetch organizations from the Engaged API
    const response = await axios.get(ENGAGED_API_URL);
    const organizations = response.data;

    // Transform the data into our Club format
    const clubs: Club[] = organizations.map((org: any) => ({
      id: org.id.toString(),
      name: org.name,
      description: org.description || '',
      imageUrl: org.image_url || '/images/clubs/default-club.jpg',
      category: org.category || 'Uncategorized',
      meetingTimes: org.meeting_times || '',
      location: org.location || '',
      contactEmail: org.contact_email || '',
      website: org.website || '',
      socialMedia: {
        instagram: org.instagram_handle || '',
        facebook: org.facebook_url || '',
        twitter: org.twitter_handle || '',
      },
    }));

    // Save the clubs data to a JSON file
    const outputPath = path.join(process.cwd(), 'src/data/clubs.json');
    fs.writeFileSync(outputPath, JSON.stringify(clubs, null, 2));

    console.log(`Successfully scraped ${clubs.length} clubs`);
    return clubs;
  } catch (error) {
    console.error('Error scraping clubs:', error);
    throw error;
  }
}

// Run the scraper
scrapeClubs(); 