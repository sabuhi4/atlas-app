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
    Security as SecurityIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';

export const Privacy: React.FC = () => {
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
                        <SecurityIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Last updated: {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                    }}
                >
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                1. Information We Collect
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We collect information that you provide directly to us, including your name, email
                                address, phone number, and payment information when you create an account or book an
                                event.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                2. How We Use Your Information
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We use the information we collect to provide, maintain, and improve our services,
                                process your bookings, send you notifications about your events, and respond to your
                                comments and questions.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                3. Information Sharing
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We do not share your personal information with third parties except as necessary to
                                provide our services, comply with the law, or protect our rights.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                4. Data Security
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We implement appropriate technical and organizational measures to protect your
                                personal information against unauthorized access, alteration, disclosure, or
                                destruction.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                5. Your Rights
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You have the right to access, update, or delete your personal information at any
                                time. You can do this by logging into your account or contacting us directly.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                6. Cookies
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We use cookies and similar tracking technologies to track activity on our service and
                                hold certain information to improve and analyze our service.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                7. Changes to This Policy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We may update our Privacy Policy from time to time. We will notify you of any changes
                                by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                8. Contact Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                If you have any questions about this Privacy Policy, please contact us at
                                privacy@atlas.com
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};
