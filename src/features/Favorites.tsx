import React from 'react';
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Paper,
    Button,
} from '@mui/material';
import { Favorite as FavoriteIcon, Explore as ExploreIcon, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { EventCard } from '@/components/cards/EventCard';
import { AppHeader } from '@/components/navigation/AppHeader';
import { useUserStore } from '@/store/userStore';

export const Favorites: React.FC = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const { data: favorites, isLoading } = useFavorites();

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            {/* Gradient Header */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FB7185 100%)',
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
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)',
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box textAlign="center">
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
                            <FavoriteIcon sx={{ color: 'white', fontSize: 32 }} />
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
                            My Favorites
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
                            {user && favorites && favorites.length > 0
                                ? `${favorites.length} saved ${favorites.length === 1 ? 'event' : 'events'} waiting for you`
                                : 'Events you love, all in one place'}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {isLoading && (
                    <Box display="flex" justifyContent="center" py={8}>
                        <CircularProgress size={48} />
                    </Box>
                )}

                {!user && !isLoading && (
                    <Paper
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                opacity: 0.2,
                            }}
                        >
                            <FavoriteIcon sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                        <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                            Sign In Required
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={4} maxWidth="500px" mx="auto">
                            Please sign in to view your favorite events and save the ones you love.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<LoginIcon />}
                            onClick={() => navigate('/auth/sign-in')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Paper>
                )}

                {user && !isLoading && favorites && favorites.length === 0 && (
                    <Paper
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                opacity: 0.2,
                            }}
                        >
                            <FavoriteIcon sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                        <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                            No Favorites Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={4} maxWidth="500px" mx="auto">
                            Start saving your favorite events! Browse through our amazing events and tap the heart icon to add them here.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ExploreIcon />}
                            onClick={() => navigate('/home')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
                                },
                            }}
                        >
                            Explore Events
                        </Button>
                    </Paper>
                )}

                {user && !isLoading && favorites && favorites.length > 0 && (
                    <>
                        <Box display="flex" alignItems="center" mb={3}>
                            <Box
                                sx={{
                                    width: 4,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                    borderRadius: 1,
                                    mr: 2,
                                }}
                            />
                            <Typography variant="h5" fontWeight="700">
                                {favorites.length} Saved {favorites.length === 1 ? 'Event' : 'Events'}
                            </Typography>
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
                            {favorites.map((favorite) => (
                                <EventCard key={favorite.id} event={favorite.events} />
                            ))}
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};
