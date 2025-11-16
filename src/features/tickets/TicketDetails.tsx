import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    Stack,
    Divider,
    Chip,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    ConfirmationNumber as TicketIcon,
    Person as PersonIcon,
    AttachMoney as MoneyIcon,
    QrCode as QrCodeIcon,
} from '@mui/icons-material';
import { useBookings } from '@/hooks/useBookings';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatSmartDate, formatPrice } from '@/utils/format';

export const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: bookings, isLoading, error } = useBookings();

    const booking = bookings?.find((b) => b.id === id);

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

    if (error || !booking) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppHeader />
                <Container maxWidth="lg" sx={{ pt: 3 }}>
                    <Alert severity="error">Failed to load ticket details.</Alert>
                    <Button
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Container>
            </Box>
        );
    }

    const event = booking.events;
    const statusColor = booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error';

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            <AppHeader />

            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                    py: { xs: 6, md: 8 },
                    mb: 6,
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{ color: 'white', mb: 3 }}
                    >
                        Back
                    </Button>
                    <Box textAlign="center">
                        <TicketIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Your Ticket
                        </Typography>
                        <Chip
                            label={booking.status.toUpperCase()}
                            color={statusColor}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Box textAlign="center" mb={4}>
                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    mx: 'auto',
                                    mb: 3,
                                    border: '2px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                                }}
                            >
                                <QrCodeIcon sx={{ fontSize: 120, color: 'text.secondary' }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Order #{booking.order_number}
                            </Typography>
                        </Box>

                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {event.title}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <CalendarIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Date & Time
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {formatSmartDate(event.start_date)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <LocationIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Location
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {event.location || 'TBA'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <MoneyIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Total Amount
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {formatPrice(booking.total_amount)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <PersonIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Seats
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {booking.selected_seats?.length || 0} seat(s)
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>

                        {booking.selected_seats && booking.selected_seats.length > 0 && (
                            <>
                                <Divider sx={{ my: 3 }} />
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                        Selected Seats
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {booking.selected_seats.map((seat, index) => (
                                            <Chip
                                                key={index}
                                                label={`${seat.seat} (${seat.type})`}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            </>
                        )}

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={1}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    Booking Date
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(booking.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    Payment Status
                                </Typography>
                                <Chip
                                    label={booking.payment_status.toUpperCase()}
                                    size="small"
                                    color={booking.payment_status === 'paid' ? 'success' : 'warning'}
                                />
                            </Box>
                        </Stack>
                    </Paper>

                    <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={() => navigate(`/events/${event.id}`)}
                    >
                        View Event Details
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};
