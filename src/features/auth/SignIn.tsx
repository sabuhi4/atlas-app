import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Container,
    Alert,
    Divider,
    IconButton,
    InputAdornment,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Google as GoogleIcon,
} from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { showSuccess, showError } from '@/utils/notifications';

export const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                showSuccess('Welcome back!');
                navigate('/home');
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to sign in';
            setError(message);
            showError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const redirectUrl = `${window.location.origin}/home`;

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl,
                },
            });

            if (error) {
                showError(error.message || 'Failed to sign in with Google');
                return;
            }

            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
            showError(message);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                position: 'relative',
                overflow: 'hidden',
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

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <Box textAlign="center" mb={4}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                                A
                            </Typography>
                        </Box>
                        <Typography variant="h4" fontWeight="800" gutterBottom>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Sign in to continue to Atlas Events
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSignIn}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ mb: 1 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box textAlign="right" mb={2}>
                            <Link
                                to="/auth/forgot-password"
                                style={{
                                    color: '#6366F1',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                mb: 2,
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                },
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleSignIn}
                            sx={{ py: 1.5, mb: 2 }}
                        >
                            Continue with Google
                        </Button>

                        <Box textAlign="center" mt={3}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link
                                    to="/auth/sign-up"
                                    style={{
                                        color: '#6366F1',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>

                <Box textAlign="center" mt={3}>
                    <Button
                        variant="text"
                        onClick={() => navigate('/home')}
                        sx={{ color: 'white', fontWeight: 600 }}
                    >
                        Continue as Guest
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};