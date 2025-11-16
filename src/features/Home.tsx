import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Chip,
    Stack,
    Paper,
    Button,
    FormControlLabel,
    Switch,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/cards/EventCard';
import { AppHeader } from '@/components/navigation/AppHeader';
import { eventCategories } from '@/utils/schemas';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { data: events, isLoading, error } = useEvents();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('date');
    const [showCancelled, setShowCancelled] = useState<boolean>(false);
    const [itemsToShow, setItemsToShow] = useState<number>(9);

    const filteredEvents = useMemo(() => {
        if (!events) return [];

        let filtered = events;

        if (!showCancelled) {
            filtered = filtered.filter(event => event.status !== 'cancelled');
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        const sorted = [...filtered];
        switch (sortBy) {
            case 'date':
                sorted.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
                break;
            case 'price-low':
                sorted.sort((a, b) => (a.ticket_price || 0) - (b.ticket_price || 0));
                break;
            case 'price-high':
                sorted.sort((a, b) => (b.ticket_price || 0) - (a.ticket_price || 0));
                break;
        }

        return sorted;
    }, [events, selectedCategory, sortBy, showCancelled]);

    const visibleEvents = useMemo(() => {
        return filteredEvents.slice(0, itemsToShow);
    }, [filteredEvents, itemsToShow]);

    const hasMore = filteredEvents.length > itemsToShow;

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 9);
    };

    const featuredEvents = events?.filter(event => event.featured && event.status !== 'cancelled') || [];

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                    py: { xs: 8, md: 12 },
                    mb: 6,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)',
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            component="h1"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                                color: 'white',
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '3.75rem' },
                            }}
                        >
                            Discover Amazing Events
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                mb: 4,
                                fontWeight: 400,
                                maxWidth: '800px',
                                mx: 'auto',
                            }}
                        >
                            {user
                                ? `Welcome back, ${user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}! Find your next adventure`
                                : 'Join thousands discovering and attending incredible events near you'}
                        </Typography>
                        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/search')}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    },
                                }}
                            >
                                Explore Events
                            </Button>
                            {user && (
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/events/create')}
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    Create Event
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {featuredEvents.length > 0 && (
                    <Box mb={6}>
                        <Box display="flex" alignItems="center" mb={3}>
                            <Box
                                sx={{
                                    width: 4,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                    borderRadius: 1,
                                    mr: 2,
                                }}
                            />
                            <Typography variant="h4" fontWeight="700">
                                Featured Events
                            </Typography>
                        </Box>
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                md: 'repeat(2, 1fr)',
                            }}
                            gap={3}
                        >
                            {featuredEvents.slice(0, 2).map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </Box>
                    </Box>
                )}

                <Box mb={4}>
                    <Box display="flex" alignItems="center" mb={3}>
                        <Box
                            sx={{
                                width: 4,
                                height: 32,
                                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                borderRadius: 1,
                                mr: 2,
                            }}
                        />
                        <Typography variant="h4" fontWeight="700">
                            All Events
                        </Typography>
                        <Chip
                            label={`${filteredEvents.length} ${filteredEvents.length === 1 ? 'Event' : 'Events'}`}
                            sx={{
                                ml: 2,
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                                color: 'primary.main',
                            }}
                        />
                    </Box>

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
                                <MenuItem value="date">Date (Upcoming First)</MenuItem>
                                <MenuItem value="price-low">Price (Low to High)</MenuItem>
                                <MenuItem value="price-high">Price (High to Low)</MenuItem>
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

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ overflowX: 'auto', pb: 2 }}
                    >
                        <Chip
                            label="All"
                            onClick={() => setSelectedCategory('All')}
                            color={selectedCategory === 'All' ? 'primary' : 'default'}
                            variant={selectedCategory === 'All' ? 'filled' : 'outlined'}
                            sx={{
                                ...(selectedCategory === 'All' && {
                                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                }),
                            }}
                        />
                        {eventCategories.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                onClick={() => setSelectedCategory(category)}
                                color={selectedCategory === category ? 'primary' : 'default'}
                                variant={selectedCategory === category ? 'filled' : 'outlined'}
                                sx={{
                                    ...(selectedCategory === category && {
                                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                    }),
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                {isLoading && (
                    <Box display="flex" justifyContent="center" py={8}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Failed to load events. Please try again.
                    </Alert>
                )}

                {!isLoading && filteredEvents && filteredEvents.length === 0 && (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            No events found in this category
                        </Typography>
                    </Paper>
                )}

                {!isLoading && filteredEvents && filteredEvents.length > 0 && (
                    <>
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)',
                            }}
                            gap={3}
                        >
                            {visibleEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </Box>

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