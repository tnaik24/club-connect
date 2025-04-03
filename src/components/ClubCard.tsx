import { Club } from '@/types/club';
import Image from 'next/image';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={club.imageUrl}
          alt={club.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop';
          }}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {club.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {club.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-bryant-blue text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 