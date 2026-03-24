import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Alert,
    Button,
    Stack,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    IconButton,
} from '@mui/material';
import { Add as AddIcon, BarChart as BarChartIcon } from '@mui/icons-material';
import { useUserEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/cards/EventCard';
import { EventCardSkeleton } from '@/components/cards/EventCardSkeleton';
import { AppHeader } from '@/components/navigation/AppHeader';

export const ManageEvents: React.FC = () => {
    const navigate = useNavigate();
    const { data: events, isLoading, error } = useUserEvents();
    const [sortBy, setSortBy] = useState<string>('date');
    const [showCancelled, setShowCancelled] = useState<boolean>(true);
    const [itemsToShow, setItemsToShow] = useState<number>(6);

    const filteredEvents = useMemo(() => {
        if (!events) return [];

        let filtered = events;

        if (!showCancelled) {
            filtered = filtered.filter(event => event.status !== 'cancelled');
        }

        const sorted = [...filtered];
        switch (sortBy) {
            case 'date':
                sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            case 'start-date':
                sorted.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
                break;
            case 'status':
                sorted.sort((a, b) => {
                    if (a.status === 'active' && b.status === 'cancelled') return -1;
                    if (a.status === 'cancelled' && b.status === 'active') return 1;
                    return 0;
                });
                break;
        }

        return sorted;
    }, [events, sortBy, showCancelled]);

    const visibleEvents = useMemo(() => {
        return filteredEvents.slice(0, itemsToShow);
    }, [filteredEvents, itemsToShow]);

    const hasMore = filteredEvents.length > itemsToShow;

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 6);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h4" fontWeight="bold">
                                My Events
                            </Typography>
                            {filteredEvents && filteredEvents.length > 0 && (
                                <Chip
                                    label={`${filteredEvents.length} ${filteredEvents.length === 1 ? 'Event' : 'Events'}`}
                                    sx={{
                                        ml: 2,
                                        fontWeight: 600,
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                                        color: 'primary.main',
                                    }}
                                />
                            )}
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/events/create')}
                        >
                            Create Event
                        </Button>
                    </Box>

                    {events && events.length > 0 && (
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={2}
                            mb={3}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    label="Sort By"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <MenuItem value="date">Date Created (Newest First)</MenuItem>
                                    <MenuItem value="start-date">Event Start Date</MenuItem>
                                    <MenuItem value="status">Status (Active First)</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showCancelled}
                                        onChange={(e) => setShowCancelled(e.target.checked)}
                                    />
                                }
                                label="Show Cancelled Events"
                            />
                        </Box>
                    )}

                    {isLoading && (
                        <Stack spacing={2}>
                            {Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)}
                        </Stack>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Failed to load your events. Please try again.
                        </Alert>
                    )}

                    {!isLoading && filteredEvents && filteredEvents.length === 0 && events && events.length === 0 && (
                        <Alert severity="info">
                            You haven't created any events yet. Click "Create Event" to get started!
                        </Alert>
                    )}

                    {!isLoading && filteredEvents && filteredEvents.length === 0 && events && events.length > 0 && (
                        <Alert severity="info">
                            No events match your current filters. Try adjusting the filters above.
                        </Alert>
                    )}

                    {!isLoading && filteredEvents && filteredEvents.length > 0 && (
                        <>
                            <Stack spacing={2}>
                                {visibleEvents.map((event) => (
                                    <Box key={event.id} sx={{ position: 'relative' }}>
                                        <EventCard event={event} />
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/events/${event.id}/analytics`);
                                            }}
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                zIndex: 10,
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                backdropFilter: 'blur(10px)',
                                                '&:hover': { bgcolor: 'white' },
                                            }}
                                            title="View Analytics"
                                        >
                                            <BarChartIcon fontSize="small" sx={{ color: 'primary.main' }} />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>

                            {hasMore && (
                                <Box display="flex" justifyContent="center" mt={4}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={handleLoadMore}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Load More Events ({filteredEvents.length - itemsToShow} remaining)
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Container>
        </Box>
    );
};
