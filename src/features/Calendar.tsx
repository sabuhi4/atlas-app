import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    IconButton,
    Badge,
    Grid,
} from '@mui/material';
import {
    ChevronLeft as PrevIcon,
    ChevronRight as NextIcon,
    CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    format,
    addMonths,
    subMonths,
} from 'date-fns';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/cards/EventCard';
import { AppHeader } from '@/components/navigation/AppHeader';
import type { Event } from '@/utils/schemas';

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { data: events = [] } = useEvents();

    const days = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        return eachDayOfInterval({
            start: startOfWeek(monthStart),
            end: endOfWeek(monthEnd),
        });
    }, [currentMonth]);

    const eventsOnDate = (date: Date): Event[] =>
        events.filter(e => e.status !== 'cancelled' && isSameDay(new Date(e.start_date), date));

    const selectedDateEvents = selectedDate ? eventsOnDate(selectedDate) : [];

    const today = new Date();

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
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                        <IconButton
                            onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
                            sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
                        >
                            <PrevIcon />
                        </IconButton>
                        <Box textAlign="center">
                            <CalendarIcon sx={{ fontSize: 36, color: 'white', mb: 1 }} />
                            <Typography variant="h3" fontWeight="bold" color="white">
                                {format(currentMonth, 'MMMM yyyy')}
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
                            sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
                        >
                            <NextIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 4 }}
                >
                    <Box
                        display="grid"
                        sx={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
                    >
                        {DAY_HEADERS.map(day => (
                            <Box
                                key={day}
                                sx={{
                                    py: 1.5,
                                    textAlign: 'center',
                                    bgcolor: 'action.hover',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                    {day}
                                </Typography>
                            </Box>
                        ))}

                        {days.map((day, idx) => {
                            const dayEvents = eventsOnDate(day);
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isToday = isSameDay(day, today);
                            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

                            return (
                                <Box
                                    key={idx}
                                    onClick={() => setSelectedDate(isSelected ? null : day)}
                                    sx={{
                                        minHeight: 80,
                                        p: 1,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        borderRight: (idx + 1) % 7 !== 0 ? '1px solid' : 'none',
                                        borderBottom: idx < days.length - 7 ? '1px solid' : 'none',
                                        borderColor: 'divider',
                                        bgcolor: isSelected
                                            ? 'primary.main'
                                            : isToday
                                                ? 'rgba(99,102,241,0.08)'
                                                : !isCurrentMonth
                                                    ? 'action.disabledBackground'
                                                    : 'background.paper',
                                        outline: isToday && !isSelected ? '2px solid' : 'none',
                                        outlineColor: 'primary.main',
                                        outlineOffset: -2,
                                        transition: 'background-color 0.15s',
                                        '&:hover': {
                                            bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={isToday ? 700 : 400}
                                        sx={{
                                            color: isSelected ? 'white' : !isCurrentMonth ? 'text.disabled' : 'text.primary',
                                        }}
                                    >
                                        {format(day, 'd')}
                                    </Typography>
                                    {dayEvents.length > 0 && (
                                        <Badge
                                            badgeContent={dayEvents.length}
                                            color="secondary"
                                            sx={{ position: 'absolute', bottom: 8, right: 8 }}
                                        >
                                            <Box />
                                        </Badge>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>

                {selectedDate && (
                    <Box>
                        <Typography variant="h5" fontWeight="700" mb={3}>
                            Events on {format(selectedDate, 'MMMM d, yyyy')}
                        </Typography>
                        {selectedDateEvents.length > 0 ? (
                            <Grid container spacing={3}>
                                {selectedDateEvents.map(event => (
                                    <Grid item xs={12} sm={6} lg={4} key={event.id}>
                                        <EventCard event={event} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Paper
                                elevation={0}
                                sx={{ p: 6, border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center' }}
                            >
                                <CalendarIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                                <Typography color="text.secondary">
                                    No events on this day
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                )}

                {!selectedDate && (
                    <Paper
                        elevation={0}
                        sx={{ p: 6, border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center' }}
                    >
                        <CalendarIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                        <Typography color="text.secondary">
                            Click a date to see events
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};
