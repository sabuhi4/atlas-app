import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Stack,
    IconButton,
    InputAdornment,
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { showSuccess, showError } from '@/utils/notifications';
import { useUserStore } from '@/store/userStore';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useUserStore();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            if (data.user) {
                showSuccess('Account created successfully!');
                navigate('/home');
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create account';
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
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join Atlas to discover amazing events
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

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

                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
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

                            <TextField
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
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
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </Stack>
                    </form>

                    <Box mt={3} textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link
                                to="/auth/sign-in"
                                style={{
                                    color: '#6366F1',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
