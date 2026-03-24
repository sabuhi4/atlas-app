import React from 'react';
import { Paper, Box, Skeleton } from '@mui/material';

export const EventCardSkeleton: React.FC = () => {
  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 0 }} />

        <Box p={3}>
          <Skeleton variant="text" height={32} width="85%" sx={{ mb: 0.5 }} />
          <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />

          <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2, flexShrink: 0 }} />
              <Skeleton variant="text" width="55%" height={20} />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2, flexShrink: 0 }} />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2, flexShrink: 0 }} />
              <Skeleton variant="text" width="45%" height={20} />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            borderTop="1px solid"
            borderColor="divider"
          >
            <Box>
              <Skeleton variant="text" width={70} height={16} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width={80} height={32} />
            </Box>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
