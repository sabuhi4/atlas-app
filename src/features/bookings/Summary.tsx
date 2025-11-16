import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Button,
    Paper,
    Stack,
    Divider,
    Chip,
    CircularProgress,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CheckCircle as CheckCircleIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Public as PublicIcon,
    EventSeat as SeatIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatSmartDate, formatPrice } from '@/utils/format';
import { useCreateBooking } from '@/hooks/useBookings';
import { showSuccess, showError } from '@/utils/notifications';

export const Summary: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, event, selectedSeats, totalAmount } = location.state || {};
    const createBooking = useCreateBooking();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmBooking = async () => {
        setIsProcessing(true);

        try {
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            await createBooking.mutateAsync({
                event_id: id!,
                order_number: orderNumber,
                total_amount: totalAmount,
                status: 'confirmed',
                payment_status: 'paid',
                selected_seats: selectedSeats,
            });

            showSuccess('Booking confirmed successfully!');
            navigate('/tickets');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to confirm booking';
            showError(message);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!bookingData || !event || !selectedSeats) {
        navigate(`/events/${id}`);
        return null;
    }

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
                        <CheckCircleIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Booking Summary
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Review your booking details before confirmation
                        </Typography>
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
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Event Details
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Event Name
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {event.title}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Date & Time
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {formatSmartDate(event.start_date)}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {event.location || 'TBA'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Category
                                </Typography>
                                <Chip label={event.category} size="small" color="primary" />
                            </Box>
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Personal Information
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <PersonIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Full Name
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {bookingData.firstName} {bookingData.lastName}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <EmailIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {bookingData.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <PhoneIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Phone
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {bookingData.phone}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <PublicIcon color="primary" />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Country
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {bookingData.country}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Selected Seats
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <SeatIcon color="primary" />
                            <Typography variant="body1">
                                {selectedSeats.length} seat(s) selected
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {selectedSeats.map((seat: { seat: string; type: string; price: number }, index: number) => (
                                <Chip
                                    key={index}
                                    label={`${seat.seat} - ${seat.type.toUpperCase()} (${formatPrice(seat.price)})`}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '2px solid',
                            borderColor: 'primary.main',
                            borderRadius: 2,
                            bgcolor: 'primary.light',
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Payment Summary
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={1.5}>
                            {selectedSeats.map((seat: { seat: string; type: string; price: number }, index: number) => (
                                <Box key={index} display="flex" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {seat.seat} ({seat.type})
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {formatPrice(seat.price)}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold">
                                    Total Amount
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="primary">
                                    {formatPrice(totalAmount)}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleConfirmBooking}
                        disabled={isProcessing || createBooking.isPending}
                        sx={{
                            py: 2,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                            },
                        }}
                    >
                        {isProcessing || createBooking.isPending ? (
                            <>
                                <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                                Processing...
                            </>
                        ) : (
                            'Confirm Booking'
                        )}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};
