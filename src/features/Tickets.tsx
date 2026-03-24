import React from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Alert,
    Chip,
    Button,
    Divider,
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    ConfirmationNumber as TicketIcon,
    Explore as ExploreIcon,
    QrCode as QrCodeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '@/hooks/useBookings';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatSmartDate, formatPrice } from '@/utils/format';
import { useUserStore } from '@/store/userStore';

export const Tickets: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { data: bookings, isLoading, error } = useBookings();


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', label: 'Confirmed' };
            case 'pending':
                return { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', label: 'Pending' };
            case 'cancelled':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', label: 'Cancelled' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6B7280', label: status };
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            {/* Gradient Header */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
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
                            <TicketIcon sx={{ color: 'white', fontSize: 32 }} />
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
                            My Tickets
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
                            {bookings && bookings.length > 0
                                ? `${bookings.length} upcoming ${bookings.length === 1 ? 'event' : 'events'} booked`
                                : 'Your event bookings and tickets'}
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

                {user && error && !isLoading && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                            borderRadius: 3,
                            '& .MuiAlert-icon': {
                                fontSize: 28,
                            },
                        }}
                    >
                        Failed to load tickets. Please try again.
                    </Alert>
                )}

                {!user && !isLoading && (
                    <Paper
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                opacity: 0.2,
                            }}
                        >
                            <TicketIcon sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                        <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                            Sign In Required
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={4} maxWidth="500px" mx="auto">
                            Please sign in to view your tickets and bookings.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/auth/sign-in')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Paper>
                )}

                {user && !isLoading && bookings && bookings.length === 0 && (
                    <Paper
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                opacity: 0.2,
                            }}
                        >
                            <TicketIcon sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                        <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                            No Tickets Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={4} maxWidth="500px" mx="auto">
                            You haven't booked any events yet. Explore amazing events and get your tickets now!
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ExploreIcon />}
                            onClick={() => navigate('/home')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                                },
                            }}
                        >
                            Explore Events
                        </Button>
                    </Paper>
                )}

                {!isLoading && bookings && bookings.length > 0 && (
                    <>
                        <Box display="flex" alignItems="center" mb={3}>
                            <Box
                                sx={{
                                    width: 4,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                    borderRadius: 1,
                                    mr: 2,
                                }}
                            />
                            <Typography variant="h5" fontWeight="700">
                                {bookings.length} {bookings.length === 1 ? 'Ticket' : 'Tickets'}
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={3}>
                            {bookings.map((booking) => {
                                const statusInfo = getStatusColor(booking.status);
                                return (
                                    <Paper
                                        key={booking.id}
                                        elevation={0}
                                        sx={{
                                            overflow: 'hidden',
                                            borderRadius: 4,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow: '0 12px 32px rgba(99, 102, 241, 0.15)',
                                                borderColor: 'primary.light',
                                                transform: 'translateY(-4px)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                                p: 2,
                                                color: 'white',
                                            }}
                                        >
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>
                                                    ORDER #{booking.order_number}
                                                </Typography>
                                                <Chip
                                                    label={statusInfo.label}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: statusInfo.bg,
                                                        color: statusInfo.color,
                                                        fontWeight: 600,
                                                        border: 'none',
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box p={3}>
                                            <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
                                                <Box flex={1}>
                                                    <Typography variant="h5" fontWeight="700" mb={2}>
                                                        {booking.events.title}
                                                    </Typography>

                                                    <Box display="flex" flexDirection="column" gap={1.5}>
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <Box
                                                                sx={{
                                                                    width: 36,
                                                                    height: 36,
                                                                    borderRadius: 2,
                                                                    bgcolor: 'primary.main',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                                                                }}
                                                            >
                                                                <CalendarIcon sx={{ color: 'white', fontSize: 18 }} />
                                                            </Box>
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {formatSmartDate(booking.events.start_date)}
                                                            </Typography>
                                                        </Box>

                                                        {booking.events.location && (
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Box
                                                                    sx={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        borderRadius: 2,
                                                                        bgcolor: 'secondary.main',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                                                    }}
                                                                >
                                                                    <LocationIcon sx={{ color: 'white', fontSize: 18 }} />
                                                                </Box>
                                                                <Typography variant="body1" fontWeight={500}>
                                                                    {booking.events.location}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 2,
                                                        bgcolor: 'action.hover',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        ml: 2,
                                                    }}
                                                >
                                                    <QrCodeIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                                                </Box>
                                            </Box>

                                            <Divider sx={{ my: 2 }} />

                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                        Total Amount
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        fontWeight="700"
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                        }}
                                                    >
                                                        {formatPrice(booking.total_amount)}
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" gap={1}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => navigate(`/tickets/${booking.id}`)}
                                                        sx={{
                                                            fontWeight: 600,
                                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                                        }}
                                                    >
                                                        View Ticket
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => navigate(`/events/${booking.events.id}`)}
                                                        sx={{
                                                            borderColor: 'primary.main',
                                                            color: 'primary.main',
                                                            fontWeight: 600,
                                                            '&:hover': {
                                                                borderColor: 'primary.dark',
                                                                bgcolor: 'rgba(99, 102, 241, 0.05)',
                                                            },
                                                        }}
                                                    >
                                                        View Event
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};
