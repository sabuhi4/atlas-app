import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    Stack,
} from '@mui/material';
import {
    Info as InfoIcon,
    ArrowBack as ArrowBackIcon,
    Event as EventIcon,
    People as PeopleIcon,
    EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';

export const About: React.FC = () => {
    const navigate = useNavigate();

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
                        <InfoIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            About Atlas
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Your gateway to amazing events
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Stack spacing={4}>
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
                            Welcome to Atlas
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Atlas is a modern event discovery and booking platform designed to connect people
                            with amazing experiences. Whether you're looking for music concerts, sports events,
                            art exhibitions, or tech conferences, Atlas makes it easy to discover and attend
                            events that match your interests.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Our mission is to bring people together through memorable experiences and make event
                            management simple for organizers and attendees alike.
                        </Typography>
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
                        <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
                            What We Offer
                        </Typography>

                        <Stack spacing={3}>
                            <Box display="flex" gap={2}>
                                <EventIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Event Discovery
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Browse thousands of events across multiple categories. Find exactly what
                                        you're looking for with our advanced search and filtering options.
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" gap={2}>
                                <PeopleIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Easy Booking
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Book tickets in just a few clicks with our streamlined booking process.
                                        Select your seats, complete payment, and get instant confirmation.
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" gap={2}>
                                <TrophyIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Event Management
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Create and manage your own events with powerful tools. Track attendance,
                                        manage tickets, and engage with your audience.
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
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Version 1.0.0
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            © 2025 Atlas. All rights reserved.
                        </Typography>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};
