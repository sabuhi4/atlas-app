import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Button,
    Chip,
    IconButton,
    CircularProgress,
    Alert,
    Stack,
    AvatarGroup,
    Avatar,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    People as PeopleIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useEvent } from '@/hooks/useEvents';
import { useIsFavorite, useAddFavorite, useRemoveFavorite } from '@/hooks/useFavorites';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatSmartDate, formatPrice } from '@/utils/format';
import { useUserStore } from '@/store/userStore';

export const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { data: event, isLoading, error } = useEvent(id!);
    const { data: isFavorite } = useIsFavorite(id!);
    const addFavorite = useAddFavorite();
    const removeFavorite = useRemoveFavorite();

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite.mutate(id!);
        } else {
            addFavorite.mutate(id!);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppHeader />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    if (error || !event) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppHeader />
                <Container maxWidth="lg" sx={{ pt: 3 }}>
                    <Alert severity="error">Failed to load event details.</Alert>
                    <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                        Go Back
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            <AppHeader />

            {/* Hero Image Section with Gradient Overlay */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: 300, md: 500 },
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${event.image || '/placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                    }}
                />

                {/* Action Buttons */}
                <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 24,
                            left: { xs: 16, md: 0 },
                            right: { xs: 16, md: 0 },
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconButton
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { bgcolor: 'white' },
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {user && (
                            <IconButton
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': { bgcolor: 'white' },
                                }}
                                onClick={handleFavoriteToggle}
                            >
                                {isFavorite ? (
                                    <FavoriteIcon sx={{ color: '#EC4899' }} />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                        )}
                    </Box>

                    {/* Event Title and Category - Bottom of Hero */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 32,
                            left: { xs: 16, md: 0 },
                            right: { xs: 16, md: 0 },
                        }}
                    >
                        <Stack spacing={2}>
                            {event.status === 'cancelled' && (
                                <Chip
                                    label="Event Cancelled"
                                    sx={{
                                        width: 'fit-content',
                                        bgcolor: 'rgba(244, 67, 54, 0.95)',
                                        color: 'white',
                                        fontWeight: 600,
                                        backdropFilter: 'blur(10px)',
                                        border: '2px solid white',
                                    }}
                                />
                            )}
                            {event.featured && (
                                <Chip
                                    label="Featured Event"
                                    sx={{
                                        width: 'fit-content',
                                        bgcolor: 'rgba(99, 102, 241, 0.9)',
                                        color: 'white',
                                        fontWeight: 600,
                                        backdropFilter: 'blur(10px)',
                                    }}
                                />
                            )}
                            <Chip
                                label={event.category}
                                sx={{
                                    width: 'fit-content',
                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 600,
                                }}
                            />
                            <Typography
                                variant="h2"
                                fontWeight="800"
                                sx={{
                                    color: 'white',
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                {event.title}
                            </Typography>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr' }} gap={4}>
                    {/* Main Content */}
                    <Stack spacing={4}>
                        {/* Event Details Card */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2.5,
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Box
                                        sx={{
                                            width: 4,
                                            height: 24,
                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Typography variant="h6" fontWeight="700">
                                        Event Details
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 2,
                                                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CalendarIcon sx={{ color: 'white', fontSize: 28 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                Date & Time
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600}>
                                                {formatSmartDate(event.start_date)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {event.location && (
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: 2,
                                                    background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <LocationIcon sx={{ color: 'white', fontSize: 28 }} />
                                            </Box>
                                            <Box flex={1}>
                                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                    Location
                                                </Typography>
                                                <Typography variant="h6" fontWeight={600}>
                                                    {event.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 2,
                                                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PeopleIcon sx={{ color: 'white', fontSize: 28 }} />
                                        </Box>
                                        <Box flex={1}>
                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                Attendees
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600}>
                                                {event.member_count} people attending
                                            </Typography>
                                        </Box>
                                        {event.member_avatars && event.member_avatars.length > 0 && (
                                            <AvatarGroup max={4}>
                                                {event.member_avatars.map((avatar, index) => (
                                                    <Avatar key={index} src={avatar} />
                                                ))}
                                            </AvatarGroup>
                                        )}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* About Event Card */}
                        {event.description && (
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 2.5,
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box
                                            sx={{
                                                width: 4,
                                                height: 24,
                                                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                                borderRadius: 1,
                                            }}
                                        />
                                        <Typography variant="h6" fontWeight="700">
                                            About Event
                                        </Typography>
                                    </Box>
                                </Box>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                                        {event.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </Stack>

                    {/* Sidebar - Booking Card */}
                    <Box>
                        <Card
                            elevation={0}
                            sx={{
                                position: 'sticky',
                                top: 100,
                                borderRadius: 4,
                                border: '2px solid',
                                borderColor: 'primary.main',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    p: 3,
                                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>
                                    Ticket Price
                                </Typography>
                                <Typography variant="h3" fontWeight="800" mt={1}>
                                    {formatPrice(event.ticket_price)}
                                </Typography>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                {user && event.user_id !== user.id && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={event.status === 'cancelled'}
                                        onClick={() => navigate(`/bookings/${event.id}`)}
                                        sx={{
                                            py: 2,
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                            },
                                        }}
                                    >
                                        {event.status === 'cancelled' ? 'Event Cancelled' : 'Book Now'}
                                    </Button>
                                )}

                                {user && event.user_id === user.id && (
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate(`/events/${event.id}/edit`)}
                                        sx={{
                                            py: 2,
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            borderWidth: 2,
                                            '&:hover': {
                                                borderWidth: 2,
                                            },
                                        }}
                                    >
                                        Edit Event
                                    </Button>
                                )}

                                {!user && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate('/auth/sign-in')}
                                        sx={{
                                            py: 2,
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                            },
                                        }}
                                    >
                                        Sign In to Book
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
