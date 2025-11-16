import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Stack,
    InputAdornment,
} from '@mui/material';
import {
    Email as EmailIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { showSuccess, showError } from '@/utils/notifications';
import { useUserStore } from '@/store/userStore';

export const ForgotPassword: React.FC = () => {
    const { isDarkMode } = useUserStore();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;

            setEmailSent(true);
            showSuccess('Password reset email sent! Check your inbox.');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to send reset email';
            showError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={12}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: isDarkMode ? 'grey.900' : 'background.paper',
                    }}
                >
                    {!emailSent ? (
                        <>
                            <Box textAlign="center" mb={4}>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    gutterBottom
                                    sx={{
                                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enter your email and we'll send you a reset link
                                </Typography>
                            </Box>

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        sx={{
                                            py: 1.5,
                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                                            },
                                        }}
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </Button>
                                </Stack>
                            </form>
                        </>
                    ) : (
                        <Box textAlign="center">
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                }}
                            >
                                <EmailIcon sx={{ fontSize: 40, color: 'white' }} />
                            </Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Check Your Email
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                We've sent a password reset link to <strong>{email}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Didn't receive the email? Check your spam folder or try again.
                            </Typography>
                        </Box>
                    )}

                    <Box mt={3} textAlign="center">
                        <Link
                            to="/auth/sign-in"
                            style={{
                                color: '#6366F1',
                                textDecoration: 'none',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <ArrowBackIcon fontSize="small" />
                            Back to Sign In
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
