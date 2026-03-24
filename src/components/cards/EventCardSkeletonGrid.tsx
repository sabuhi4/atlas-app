import React from 'react';
import { Box } from '@mui/material';
import { EventCardSkeleton } from './EventCardSkeleton';

interface EventCardSkeletonGridProps {
  count?: number;
}

export const EventCardSkeletonGrid: React.FC<EventCardSkeletonGridProps> = ({ count = 9 }) => {
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          lg: '1fr 1fr 1fr',
        },
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </Box>
  );
};
