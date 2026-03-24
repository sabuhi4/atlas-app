import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Typography,
    Container,
    Button,
    Paper,
    Stack,
    Divider,
    TextField,
    CircularProgress,
    Chip,
    InputAdornment,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CreditCard as CreditCardIcon,
    Lock as LockIcon,
    EventSeat as SeatIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatPrice } from '@/utils/format';
import { useCreateBooking } from '@/hooks/useBookings';
import { showError } from '@/utils/notifications';

interface CardFormData {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardholderName: string;
}

const luhnCheck = (num: string): boolean => {
    const digits = num.replace(/\s/g, '').split('').map(Number);
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = digits[i];
        if (isEven) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        sum += d;
        isEven = !isEven;
    }
    return sum % 10 === 0;
};

const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
};

export const Payment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, event, selectedSeats, totalAmount } = location.state || {};
    const createBooking = useCreateBooking();
    const [isProcessing, setIsProcessing] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<CardFormData>({
        defaultValues: { cardNumber: '', expiry: '', cvv: '', cardholderName: '' },
    });

    if (!bookingData || !event || !selectedSeats) {
        navigate(`/events/${id}`);
        return null;
    }

    const onSubmit = async () => {
        setIsProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            await createBooking.mutateAsync({
                event_id: id!,
                order_number: orderNumber,
                total_amount: totalAmount,
                status: 'confirmed',
                payment_status: 'paid',
                selected_seats: selectedSeats,
            });

            navigate(`/bookings/${id}/confirmation`, {
                state: { bookingData, event, selectedSeats, totalAmount },
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Payment failed';
            showError(message);
            setIsProcessing(false);
        }
    };

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
                        <LockIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Secure Payment
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            Your payment information is encrypted and secure
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <SeatIcon color="primary" />
                            <Typography variant="body1">
                                {selectedSeats.length} seat(s) — {event.title}
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {selectedSeats.map((seat: { seat: string; type: string; price: number }, index: number) => (
                                <Chip
                                    key={index}
                                    label={`${seat.seat} ${seat.type.toUpperCase()} — ${formatPrice(seat.price)}`}
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">Total</Typography>
                            <Typography variant="h5" fontWeight="bold" color="primary">
                                {formatPrice(totalAmount)}
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
                    >
                        <Box display="flex" alignItems="center" gap={1} mb={3}>
                            <CreditCardIcon color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Card Details
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <Controller
                                    name="cardholderName"
                                    control={control}
                                    rules={{ required: 'Cardholder name is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cardholder Name"
                                            fullWidth
                                            error={!!errors.cardholderName}
                                            helperText={errors.cardholderName?.message}
                                            disabled={isProcessing}
                                        />
                                    )}
                                />

                                <Controller
                                    name="cardNumber"
                                    control={control}
                                    rules={{
                                        required: 'Card number is required',
                                        validate: (val) => {
                                            const digits = val.replace(/\s/g, '');
                                            if (digits.length !== 16) return 'Card number must be 16 digits';
                                            if (!luhnCheck(digits)) return 'Invalid card number';
                                            return true;
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Card Number"
                                            fullWidth
                                            placeholder="1234 5678 9012 3456"
                                            error={!!errors.cardNumber}
                                            helperText={errors.cardNumber?.message}
                                            disabled={isProcessing}
                                            onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreditCardIcon sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />

                                <Stack direction="row" spacing={2}>
                                    <Controller
                                        name="expiry"
                                        control={control}
                                        rules={{
                                            required: 'Expiry is required',
                                            validate: (val) => {
                                                const match = val.match(/^(\d{2})\/(\d{2})$/);
                                                if (!match) return 'Use MM/YY format';
                                                const month = parseInt(match[1]);
                                                const year = parseInt(match[2]) + 2000;
                                                if (month < 1 || month > 12) return 'Invalid month';
                                                if (year < new Date().getFullYear()) return 'Card expired';
                                                return true;
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Expiry"
                                                fullWidth
                                                placeholder="MM/YY"
                                                error={!!errors.expiry}
                                                helperText={errors.expiry?.message}
                                                disabled={isProcessing}
                                                onChange={(e) => field.onChange(formatExpiry(e.target.value))}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="cvv"
                                        control={control}
                                        rules={{
                                            required: 'CVV is required',
                                            pattern: { value: /^\d{3,4}$/, message: '3 or 4 digits' },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="CVV"
                                                fullWidth
                                                placeholder="123"
                                                type="password"
                                                error={!!errors.cvv}
                                                helperText={errors.cvv?.message}
                                                disabled={isProcessing}
                                                inputProps={{ maxLength: 4 }}
                                            />
                                        )}
                                    />
                                </Stack>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={isProcessing}
                                    sx={{
                                        py: 2,
                                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                                        },
                                    }}
                                >
                                    {isProcessing ? (
                                        <>
                                            <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                                            Processing payment...
                                        </>
                                    ) : (
                                        `Pay ${formatPrice(totalAmount)}`
                                    )}
                                </Button>
                            </Stack>
                        </form>
                    </Paper>

                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                        <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            256-bit SSL encryption — your data is safe
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};
