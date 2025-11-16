import React from 'react';
import {
    Box,
    Typography,
    Container,
    Avatar,
    Button,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Switch,
    Divider,
} from '@mui/material';
import {
    Event as EventIcon,
    ConfirmationNumber as TicketIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    DarkMode as DarkModeIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { AppHeader } from '@/components/navigation/AppHeader';
import { supabase } from '@/utils/supabase';

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, isDarkMode, toggleDarkMode } = useUserStore();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/auth/sign-in');
    };

    const handleSignIn = () => {
        navigate('/auth/sign-in');
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            {/* Gradient Header with Profile */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                    py: { xs: 8, md: 10 },
                    mb: 6,
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
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)',
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 3,
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                fontSize: '3rem',
                                fontWeight: 800,
                                color: 'white',
                                border: '4px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            {user?.email?.[0].toUpperCase() || 'G'}
                        </Avatar>
                        <Typography
                            variant="h3"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                                color: 'white',
                                mb: 1,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            {user?.email?.split('@')[0] || 'Guest User'}
                        </Typography>
                        {user && (
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 400,
                                }}
                            >
                                {user.email}
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ pb: 8 }}>
                {user && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            borderRadius: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                p: 2.5,
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 24,
                                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="h6" fontWeight="700">
                                    Quick Actions
                                </Typography>
                            </Box>
                        </Box>
                        <List sx={{ p: 0 }}>
                            <ListItemButton
                                onClick={() => navigate('/events/manage')}
                                sx={{
                                    py: 2,
                                    '&:hover': {
                                        bgcolor: 'rgba(99, 102, 241, 0.05)',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <EventIcon sx={{ color: 'white' }} />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" fontWeight={600}>My Events</Typography>}
                                    secondary="Manage events you created"
                                />
                                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton
                                onClick={() => navigate('/tickets')}
                                sx={{
                                    py: 2,
                                    '&:hover': {
                                        bgcolor: 'rgba(99, 102, 241, 0.05)',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <TicketIcon sx={{ color: 'white' }} />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" fontWeight={600}>My Tickets</Typography>}
                                    secondary="View your bookings"
                                />
                                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
                            </ListItemButton>
                        </List>
                    </Paper>
                )}

                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            p: 2.5,
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box
                                sx={{
                                    width: 4,
                                    height: 24,
                                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                    borderRadius: 1,
                                }}
                            />
                            <Typography variant="h6" fontWeight="700">
                                Settings
                            </Typography>
                        </Box>
                    </Box>
                    <List sx={{ p: 0 }}>
                        <ListItem
                            sx={{
                                py: 2,
                            }}
                        >
                            <ListItemIcon>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DarkModeIcon sx={{ color: 'white' }} />
                                </Box>
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="body1" fontWeight={600}>Dark Mode</Typography>}
                                secondary="Toggle dark/light theme"
                            />
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#6366F1',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        bgcolor: '#6366F1',
                                    },
                                }}
                            />
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        p: 3,
                    }}
                >
                    {user ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            size="large"
                            startIcon={<LogoutIcon />}
                            onClick={handleSignOut}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                },
                            }}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<LoginIcon />}
                            onClick={handleSignIn}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};
