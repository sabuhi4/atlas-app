import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Typography,
    IconButton,
    Chip,
    Box,
    Badge,
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    People as PeopleIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import type { Event } from '@/utils/schemas';
import { formatSmartDate, formatPrice } from '@/utils/format';
import { useIsFavorite, useAddFavorite, useRemoveFavorite } from '@/hooks/useFavorites';

interface EventCardProps {
    event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const navigate = useNavigate();
    const { data: isFavorite } = useIsFavorite(event.id);
    const addFavorite = useAddFavorite();
    const removeFavorite = useRemoveFavorite();

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite.mutate(event.id);
        } else {
            addFavorite.mutate(event.id);
        }
    };

    const handleCardClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <Box
            onClick={handleCardClick}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .event-image': {
                        transform: 'scale(1.1)',
                    },
                },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    '&:hover': {
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
                        borderColor: 'primary.light',
                    },
                }}
            >
                <Box
                    sx={{
                        height: 220,
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    }}
                >
                    <Box
                        className="event-image"
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${event.image || '/placeholder.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.5s ease',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        {event.status === 'cancelled' && (
                            <Chip
                                label="Cancelled"
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                    color: 'error.main',
                                    fontWeight: 600,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid',
                                    borderColor: 'error.main',
                                }}
                            />
                        )}
                        {event.featured && (
                            <Chip
                                label="Featured"
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                    backdropFilter: 'blur(10px)',
                                }}
                            />
                        )}
                        <IconButton
                            size="small"
                            onClick={handleFavoriteToggle}
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    bgcolor: 'white',
                                },
                            }}
                        >
                            {isFavorite ? (
                                <FavoriteIcon fontSize="small" sx={{ color: '#EC4899' }} />
                            ) : (
                                <FavoriteBorderIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                        }}
                    >
                        <Chip
                            label={event.category}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                <Box p={3}>
                    <Typography
                        variant="h5"
                        component="div"
                        fontWeight="700"
                        mb={2}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {event.title}
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                                }}
                            >
                                <CalendarIcon sx={{ color: 'white', fontSize: 20 }} />
                            </Box>
                            <Typography variant="body2" color="text.primary" fontWeight={500}>
                                {formatSmartDate(event.start_date)}
                            </Typography>
                        </Box>

                        {event.location && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        bgcolor: 'secondary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                                    }}
                                >
                                    <LocationIcon sx={{ color: 'white', fontSize: 20 }} />
                                </Box>
                                <Typography variant="body2" color="text.primary" fontWeight={500} noWrap>
                                    {event.location}
                                </Typography>
                            </Box>
                        )}

                        <Box display="flex" alignItems="center" gap={1}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    bgcolor: 'action.selected',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Badge badgeContent={event.member_count} color="primary" max={999}>
                                    <PeopleIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                </Badge>
                            </Box>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                {event.member_count} people attending
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        pt={2}
                        borderTop="1px solid"
                        borderColor="divider"
                    >
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                Ticket Price
                            </Typography>
                            <Typography variant="h5" fontWeight="700" sx={{
                                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                {formatPrice(event.ticket_price)}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
