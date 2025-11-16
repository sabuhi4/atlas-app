import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Stack,
    CircularProgress,
    Alert,
    MenuItem,
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useEvent } from '@/hooks/useEvents';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatSmartDate, formatPrice } from '@/utils/format';

export const BookEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: event, isLoading, error } = useEvent(id!);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/bookings/${id}/select-seats`, {
            state: { bookingData: formData, event },
        });
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
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
                    <Box textAlign="center">
                        <CalendarIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Book Your Ticket
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {event.title}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                    <Box flex={2}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Personal Information
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Please fill in your details to continue with the booking
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange('firstName')}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange('lastName')}
                                            required
                                        />
                                    </Stack>

                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="Email"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        required
                                        InputProps={{
                                            startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        type="tel"
                                        label="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange('phone')}
                                        required
                                        InputProps={{
                                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        select
                                        label="Country"
                                        value={formData.country}
                                        onChange={handleChange('country')}
                                        required
                                    >
                                        <MenuItem value="US">United States</MenuItem>
                                        <MenuItem value="UK">United Kingdom</MenuItem>
                                        <MenuItem value="CA">Canada</MenuItem>
                                        <MenuItem value="AU">Australia</MenuItem>
                                        <MenuItem value="DE">Germany</MenuItem>
                                        <MenuItem value="FR">France</MenuItem>
                                        <MenuItem value="IT">Italy</MenuItem>
                                        <MenuItem value="ES">Spain</MenuItem>
                                        <MenuItem value="JP">Japan</MenuItem>
                                        <MenuItem value="CN">China</MenuItem>
                                        <MenuItem value="IN">India</MenuItem>
                                        <MenuItem value="BR">Brazil</MenuItem>
                                    </TextField>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            py: 1.5,
                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                                            },
                                        }}
                                    >
                                        Continue to Seat Selection
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </Box>

                    <Box flex={1}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                position: 'sticky',
                                top: 100,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Event Summary
                            </Typography>

                            {event.image && (
                                <Box
                                    component="img"
                                    src={event.image}
                                    alt={event.title}
                                    sx={{
                                        width: '100%',
                                        height: 150,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        mb: 2,
                                    }}
                                />
                            )}

                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Event
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {event.title}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Date
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
                                        Price per ticket
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        {formatPrice(event.ticket_price)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};
