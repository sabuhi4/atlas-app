import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    CircularProgress,
    InputAdornment,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Search as SearchIcon, EventNote as EventNoteIcon } from '@mui/icons-material';
import { useSearchEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/cards/EventCard';
import { AppHeader } from '@/components/navigation/AppHeader';

export const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('date');
    const [showCancelled, setShowCancelled] = useState<boolean>(false);
    const { data: events, isLoading } = useSearchEvents(searchQuery);

    const filteredEvents = useMemo(() => {
        if (!events) return [];

        let filtered = events;

        if (!showCancelled) {
            filtered = filtered.filter(event => event.status !== 'cancelled');
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
    }, [events, sortBy, showCancelled]);

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            {/* Gradient Header */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                    py: { xs: 6, md: 8 },
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
                        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 50%)',
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box textAlign="center" mb={4}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <SearchIcon sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                        <Typography
                            variant="h3"
                            component="h1"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                                color: 'white',
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            Search Events
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 400,
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Find the perfect event for you
                        </Typography>
                    </Box>

                    {/* Modern Search Bar with Glassmorphism */}
                    <Paper
                        elevation={0}
                        sx={{
                            maxWidth: '700px',
                            mx: 'auto',
                            borderRadius: 4,
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search by title, category, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    fontSize: '1.1rem',
                                    py: 1,
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                    </Paper>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {isLoading && (
                    <Box display="flex" justifyContent="center" py={8}>
                        <CircularProgress size={48} />
                    </Box>
                )}

                {!isLoading && searchQuery && filteredEvents && filteredEvents.length === 0 && (
                    <Paper
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 4,
                            border: '2px dashed',
                            borderColor: 'divider',
                        }}
                    >
                        <EventNoteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" fontWeight="700" gutterBottom>
                            No events found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            We couldn't find any events matching "{searchQuery}". Try a different search term.
                        </Typography>
                    </Paper>
                )}

                {!isLoading && filteredEvents && filteredEvents.length > 0 && (
                    <>
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
                            <Typography variant="h5" fontWeight="700">
                                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                            </Typography>
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

                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)',
                            }}
                            gap={3}
                        >
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </Box>
                    </>
                )}

                {!searchQuery && !isLoading && (
                    <Paper
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2, opacity: 0.3 }} />
                        <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                            Start Your Search
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Enter keywords to discover amazing events
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};
