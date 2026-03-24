import React, { useState } from 'react';
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
    TextField,
    Stack,
    CircularProgress,
    Collapse,
} from '@mui/material';
import {
    Event as EventIcon,
    ConfirmationNumber as TicketIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    DarkMode as DarkModeIcon,
    ChevronRight as ChevronRightIcon,
    Edit as EditIcon,
    Lock as LockIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { AppHeader } from '@/components/navigation/AppHeader';
import { ImageUploadZone } from '@/components/ImageUploadZone';
import { dataService } from '@/services/dataService';
import { supabase } from '@/utils/supabase';
import { showSuccess, showError } from '@/utils/notifications';

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
    <Box
        sx={{
            p: 2.5,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(236,72,153,0.05) 100%)',
        }}
    >
        <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ width: 4, height: 24, background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)', borderRadius: 1 }} />
            <Typography variant="h6" fontWeight="700">{label}</Typography>
        </Box>
    </Box>
);

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, isDarkMode, toggleDarkMode, setUser } = useUserStore();

    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);

    const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/auth/sign-in');
    };

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        try {
            await dataService.updateUserProfile({ full_name: displayName, avatar_url: avatarUrl });
            const { data: { user: refreshed } } = await supabase.auth.getUser();
            if (refreshed) setUser(refreshed);
            showSuccess('Profile updated successfully');
            setEditOpen(false);
        } catch (err) {
            showError((err as Error).message || 'Failed to update profile');
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleSavePassword = async () => {
        if (newPassword !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }
        setIsSavingPassword(true);
        try {
            await dataService.updatePassword(newPassword);
            showSuccess('Password updated successfully');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordOpen(false);
        } catch (err) {
            showError((err as Error).message || 'Failed to update password');
        } finally {
            setIsSavingPassword(false);
        }
    };

    const displayedName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest User';
    const avatarSrc = user?.user_metadata?.avatar_url || undefined;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

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
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        opacity: 0.1,
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)',
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            src={avatarSrc}
                            sx={{
                                width: 120, height: 120, mb: 3,
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                fontSize: '3rem', fontWeight: 800, color: 'white',
                                border: '4px solid rgba(255,255,255,0.3)',
                            }}
                        >
                            {!avatarSrc && (user?.email?.[0].toUpperCase() || 'G')}
                        </Avatar>
                        <Typography
                            variant="h3" fontWeight="800" gutterBottom
                            sx={{ color: 'white', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                        >
                            {displayedName}
                        </Typography>
                        {user && (
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}>
                                {user.email}
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ pb: 8 }}>
                {user && (
                    <>
                        <Paper
                            elevation={0}
                            sx={{ mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
                        >
                            <Box
                                component="button"
                                onClick={() => setEditOpen(prev => !prev)}
                                sx={{
                                    width: '100%', border: 'none', background: 'none', cursor: 'pointer', p: 0,
                                    display: 'block', textAlign: 'left',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(236,72,153,0.05) 100%)',
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box sx={{ width: 4, height: 24, background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)', borderRadius: 1 }} />
                                        <EditIcon sx={{ color: 'primary.main', mr: 0.5 }} />
                                        <Typography variant="h6" fontWeight="700">Edit Profile</Typography>
                                    </Box>
                                    {editOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Box>
                            </Box>
                            <Collapse in={editOpen}>
                                <Stack spacing={3} sx={{ p: 3 }}>
                                    <TextField
                                        label="Display Name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        fullWidth
                                    />
                                    <ImageUploadZone
                                        value={avatarUrl}
                                        onChange={setAvatarUrl}
                                        label="Profile Picture"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleSaveProfile}
                                        disabled={isSavingProfile}
                                        sx={{
                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        {isSavingProfile ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Save Profile'}
                                    </Button>
                                </Stack>
                            </Collapse>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{ mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
                        >
                            <Box
                                component="button"
                                onClick={() => setPasswordOpen(prev => !prev)}
                                sx={{
                                    width: '100%', border: 'none', background: 'none', cursor: 'pointer', p: 0,
                                    display: 'block', textAlign: 'left',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(236,72,153,0.05) 100%)',
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box sx={{ width: 4, height: 24, background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)', borderRadius: 1 }} />
                                        <LockIcon sx={{ color: 'primary.main', mr: 0.5 }} />
                                        <Typography variant="h6" fontWeight="700">Change Password</Typography>
                                    </Box>
                                    {passwordOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Box>
                            </Box>
                            <Collapse in={passwordOpen}>
                                <Stack spacing={3} sx={{ p: 3 }}>
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        fullWidth
                                        error={confirmPassword !== '' && newPassword !== confirmPassword}
                                        helperText={confirmPassword !== '' && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleSavePassword}
                                        disabled={isSavingPassword}
                                        sx={{
                                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        {isSavingPassword ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Update Password'}
                                    </Button>
                                </Stack>
                            </Collapse>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{ mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
                        >
                            <SectionHeader label="Quick Actions" />
                            <List sx={{ p: 0 }}>
                                <ListItemButton
                                    onClick={() => navigate('/events/manage')}
                                    sx={{ py: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.05)' } }}
                                >
                                    <ListItemIcon>
                                        <Box sx={{
                                            width: 48, height: 48, borderRadius: 2,
                                            background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
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
                                    sx={{ py: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.05)' } }}
                                >
                                    <ListItemIcon>
                                        <Box sx={{
                                            width: 48, height: 48, borderRadius: 2,
                                            background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
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
                    </>
                )}

                <Paper
                    elevation={0}
                    sx={{ mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
                >
                    <SectionHeader label="Settings" />
                    <List sx={{ p: 0 }}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <Box sx={{
                                    width: 48, height: 48, borderRadius: 2,
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
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
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366F1' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6366F1' },
                                }}
                            />
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 3 }}
                >
                    {user ? (
                        <Button
                            fullWidth variant="outlined" color="error" size="large"
                            startIcon={<LogoutIcon />} onClick={handleSignOut}
                            sx={{ py: 1.5, fontWeight: 600, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            fullWidth variant="contained" size="large"
                            startIcon={<LoginIcon />} onClick={() => navigate('/auth/sign-in')}
                            sx={{
                                py: 1.5, fontWeight: 600,
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                '&:hover': { background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' },
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
