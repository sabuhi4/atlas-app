import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Button,
    Paper,
    Stack,
    Chip,
    Grid,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    EventSeat as SeatIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatPrice } from '@/utils/format';

interface Seat {
    seat: string;
    type: 'standard' | 'vip';
    row: number;
    column: number;
    price: number;
    isAvailable: boolean;
}

export const SelectSeats: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, event } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const rows = 8;
    const seatsPerRow = 10;
    const basePrice = event?.ticket_price || 20;

    const generateSeats = (): Seat[] => {
        const seats: Seat[] = [];
        const letters = 'ABCDEFGH';

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < seatsPerRow; col++) {
                const isVip = row < 2;
                seats.push({
                    seat: `${letters[row]}${col + 1}`,
                    type: isVip ? 'vip' : 'standard',
                    row,
                    column: col,
                    price: isVip ? basePrice * 1.5 : basePrice,
                    isAvailable: Math.random() > 0.3,
                });
            }
        }
        return seats;
    };

    const [seats] = useState<Seat[]>(generateSeats());

    const handleSeatClick = (seat: Seat) => {
        if (!seat.isAvailable) return;

        const isSelected = selectedSeats.some((s) => s.seat === seat.seat);

        if (isSelected) {
            setSelectedSeats((prev) => prev.filter((s) => s.seat !== seat.seat));
        } else {
            setSelectedSeats((prev) => [...prev, seat]);
        }
    };

    const getTotalPrice = () => {
        return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) return;

        navigate(`/bookings/${id}/payment`, {
            state: {
                bookingData,
                event,
                selectedSeats,
                totalAmount: getTotalPrice(),
            },
        });
    };

    if (!bookingData || !event) {
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
                        <SeatIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Select Your Seats
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {event.title}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
                        <Chip
                            icon={<Box sx={{ width: 20, height: 20, bgcolor: 'success.main', borderRadius: 1 }} />}
                            label="Available"
                            variant="outlined"
                        />
                        <Chip
                            icon={<Box sx={{ width: 20, height: 20, bgcolor: 'primary.main', borderRadius: 1 }} />}
                            label="Selected"
                            variant="outlined"
                        />
                        <Chip
                            icon={<Box sx={{ width: 20, height: 20, bgcolor: 'grey.400', borderRadius: 1 }} />}
                            label="Occupied"
                            variant="outlined"
                        />
                        <Chip
                            icon={<Box sx={{ width: 20, height: 20, bgcolor: 'warning.main', borderRadius: 1 }} />}
                            label="VIP"
                            variant="outlined"
                        />
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Box
                            sx={{
                                mb: 4,
                                py: 1,
                                bgcolor: 'grey.200',
                                borderRadius: 1,
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="body2" fontWeight={600}>
                                SCREEN
                            </Typography>
                        </Box>

                        <Box sx={{ overflowX: 'auto' }}>
                            <Grid container spacing={1} justifyContent="center">
                                {seats.map((seat) => {
                                    const isSelected = selectedSeats.some((s) => s.seat === seat.seat);
                                    const isVip = seat.type === 'vip';

                                    return (
                                        <Grid key={seat.seat}>
                                            <Box
                                                onClick={() => handleSeatClick(seat)}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 1,
                                                    cursor: seat.isAvailable ? 'pointer' : 'not-allowed',
                                                    bgcolor: !seat.isAvailable
                                                        ? 'grey.400'
                                                        : isSelected
                                                        ? 'primary.main'
                                                        : isVip
                                                        ? 'warning.light'
                                                        : 'success.light',
                                                    color: isSelected || !seat.isAvailable ? 'white' : 'text.primary',
                                                    border: '1px solid',
                                                    borderColor: !seat.isAvailable
                                                        ? 'grey.500'
                                                        : isSelected
                                                        ? 'primary.dark'
                                                        : isVip
                                                        ? 'warning.main'
                                                        : 'success.main',
                                                    transition: 'all 0.2s',
                                                    '&:hover': seat.isAvailable
                                                        ? {
                                                              transform: 'scale(1.1)',
                                                              boxShadow: 2,
                                                          }
                                                        : {},
                                                }}
                                            >
                                                <Typography variant="caption" fontWeight={600}>
                                                    {seat.seat}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Stack spacing={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body1">
                                    Selected Seats ({selectedSeats.length})
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedSeats.map((s) => s.seat).join(', ') || 'None'}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight="bold">
                                    Total
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="primary">
                                    {formatPrice(getTotalPrice())}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={selectedSeats.length === 0}
                                onClick={handleContinue}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    py: 1.5,
                                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                                    },
                                }}
                            >
                                Continue to Payment
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};
