import useSWR from 'swr';
import { Club } from '@/types/club';
import { clubs } from '@/data/clubs';

interface UseClubsOptions {
  category?: string;
  search?: string;
  tags?: string[];
}

interface UseClubsResponse {
  clubs: Club[];
  isLoading: boolean;
  error: Error | null;
  mutate: () => Promise<void | { clubs: Club[]; total: number }>;
}

/**
 * Custom hook for fetching and managing club data
 */
export function useClubs(options: UseClubsOptions = {}): UseClubsResponse {
  const { category, search, tags } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  if (search) queryParams.append('search', search);
  if (tags?.length) queryParams.append('tags', tags.join(','));

  const queryString = queryParams.toString();
  const url = `/api/clubs${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<{
    clubs: Club[];
    total: number;
  }>(url, {
    fallbackData: { clubs, total: clubs.length },
  });

  return {
    clubs: data?.clubs || clubs,
    isLoading,
    error: error || null,
    mutate,
  };
} 