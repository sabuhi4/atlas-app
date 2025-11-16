import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    Favorite as FavoriteIcon,
    ConfirmationNumber as TicketIcon,
    Add as AddIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useUserStore } from '@/store/userStore';

export const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isDarkMode, toggleDarkMode } = useUserStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        handleMobileMenuClose();
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { label: 'Home', icon: <HomeIcon />, path: '/home' },
        { label: 'Search', icon: <SearchIcon />, path: '/search' },
        { label: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
        { label: 'Tickets', icon: <TicketIcon />, path: '/tickets' },
    ];

    return (
        <>
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backdropFilter: 'blur(20px)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar sx={{ py: 1 }}>
                <IconButton
                    edge="start"
                    onClick={handleMobileMenuToggle}
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        color: 'text.primary',
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Box
                    onClick={() => navigate('/home')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        mr: { xs: 'auto', md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>
                            A
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Atlas
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            startIcon={item.icon}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                fontWeight: 600,
                                bgcolor: isActive(item.path) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                '&:hover': {
                                    bgcolor: isActive(item.path) ? 'rgba(99, 102, 241, 0.15)' : 'action.hover',
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>

                {user && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/events/create')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex' },
                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                            },
                        }}
                    >
                        Create Event
                    </Button>
                )}

                <IconButton
                    onClick={toggleDarkMode}
                    sx={{
                        mr: 1,
                        color: 'text.primary',
                    }}
                >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                        }}
                    >
                        {user?.email?.[0].toUpperCase() || 'G'}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {user ? [
                            <MenuItem key="email" disabled>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </MenuItem>,
                            <Divider key="divider1" />,
                            <MenuItem
                                key="profile"
                                onClick={() => {
                                    navigate('/profile');
                                    handleMenuClose();
                                }}
                            >
                                Profile
                            </MenuItem>,
                            <MenuItem
                                key="events"
                                onClick={() => {
                                    navigate('/events/manage');
                                    handleMenuClose();
                                }}
                            >
                                My Events
                            </MenuItem>,
                            <Divider key="divider2" />,
                            <MenuItem
                                key="help"
                                onClick={() => {
                                    navigate('/help');
                                    handleMenuClose();
                                }}
                            >
                                Help & Support
                            </MenuItem>,
                            <MenuItem
                                key="privacy"
                                onClick={() => {
                                    navigate('/privacy');
                                    handleMenuClose();
                                }}
                            >
                                Privacy Policy
                            </MenuItem>,
                            <MenuItem
                                key="about"
                                onClick={() => {
                                    navigate('/about');
                                    handleMenuClose();
                                }}
                            >
                                About
                            </MenuItem>
                        ] : [
                            <MenuItem
                                key="signin"
                                onClick={() => {
                                    navigate('/auth/sign-in');
                                    handleMenuClose();
                                }}
                            >
                                Sign In
                            </MenuItem>,
                            <Divider key="divider" />,
                            <MenuItem
                                key="help"
                                onClick={() => {
                                    navigate('/help');
                                    handleMenuClose();
                                }}
                            >
                                Help & Support
                            </MenuItem>,
                            <MenuItem
                                key="about"
                                onClick={() => {
                                    navigate('/about');
                                    handleMenuClose();
                                }}
                            >
                                About
                            </MenuItem>
                        ]}
                </Menu>
            </Toolbar>
        </AppBar>

        <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                    width: 280,
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>
                            A
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Atlas
                    </Typography>
                </Box>
                <IconButton onClick={handleMobileMenuClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider />

            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            selected={isActive(item.path)}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                py: 1.5,
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(99, 102, 241, 0.15)',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                    minWidth: 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: isActive(item.path) ? 600 : 400,
                                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {user && (
                <>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<AddIcon />}
                            onClick={() => handleNavigation('/events/create')}
                            sx={{
                                py: 1.5,
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                },
                            }}
                        >
                            Create Event
                        </Button>
                    </Box>
                </>
            )}
        </Drawer>
    </>
    );
};
