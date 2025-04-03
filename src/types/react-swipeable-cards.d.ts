declare module 'react-swipeable-cards' {
  import { ReactNode } from 'react';

  interface SwipeableCardProps {
    children: ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    className?: string;
  }

  export const SwipeableCard: React.FC<SwipeableCardProps>;
} 