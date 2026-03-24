import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    Stack,
    Grid,
    Skeleton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    BarChart as BarChartIcon,
    People as PeopleIcon,
    AttachMoney as MoneyIcon,
    ConfirmationNumber as TicketIcon,
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { useEvent, useEventAnalytics } from '@/hooks/useEvents';
import { AppHeader } from '@/components/navigation/AppHeader';
import { formatPrice } from '@/utils/format';

const PIE_COLORS = ['#6366F1', '#EC4899', '#8B5CF6', '#EF4444'];

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, gradient }) => (
    <Paper
        elevation={0}
        sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
    >
        <Box display="flex" alignItems="center" gap={2}>
            <Box
                sx={{
                    width: 52, height: 52, borderRadius: 2, background: gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Typography variant="h5" fontWeight="700">{value}</Typography>
            </Box>
        </Box>
    </Paper>
);

export const EventAnalytics: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: event } = useEvent(id!);
    const { data: analytics, isLoading } = useEventAnalytics(id!);

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
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/events/manage')}
                        sx={{ color: 'white', mb: 3 }}
                    >
                        Back to My Events
                    </Button>
                    <Box display="flex" alignItems="center" gap={2}>
                        <BarChartIcon sx={{ fontSize: 48, color: 'white' }} />
                        <Box>
                            <Typography variant="h3" fontWeight="bold" color="white">
                                Analytics
                            </Typography>
                            {event && (
                                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
                                    {event.title}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {isLoading && (
                    <Stack spacing={3}>
                        <Grid container spacing={3}>
                            {[1, 2, 3].map(i => (
                                <Grid item xs={12} md={4} key={i}>
                                    <Skeleton variant="rounded" height={96} sx={{ borderRadius: 3 }} />
                                </Grid>
                            ))}
                        </Grid>
                        <Skeleton variant="rounded" height={300} sx={{ borderRadius: 3 }} />
                        <Skeleton variant="rounded" height={300} sx={{ borderRadius: 3 }} />
                    </Stack>
                )}

                {!isLoading && analytics && (
                    <Stack spacing={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <StatCard
                                    icon={<TicketIcon sx={{ color: 'white' }} />}
                                    label="Total Bookings"
                                    value={String(analytics.total_bookings)}
                                    gradient="linear-gradient(135deg, #6366F1 0%, #818CF8 100%)"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <StatCard
                                    icon={<MoneyIcon sx={{ color: 'white' }} />}
                                    label="Total Revenue"
                                    value={formatPrice(analytics.total_revenue)}
                                    gradient="linear-gradient(135deg, #EC4899 0%, #F472B6 100%)"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <StatCard
                                    icon={<PeopleIcon sx={{ color: 'white' }} />}
                                    label="Confirmed Attendees"
                                    value={String(analytics.attendees)}
                                    gradient="linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)"
                                />
                            </Grid>
                        </Grid>

                        {analytics.revenueOverTime.length > 0 ? (
                            <Paper
                                elevation={0}
                                sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
                            >
                                <Typography variant="h6" fontWeight="700" mb={3}>
                                    Revenue Over Time
                                </Typography>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={analytics.revenueOverTime}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                                        <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
                                        <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        ) : null}

                        {analytics.bookingsByStatus.length > 0 ? (
                            <Paper
                                elevation={0}
                                sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
                            >
                                <Typography variant="h6" fontWeight="700" mb={3}>
                                    Bookings by Status
                                </Typography>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={analytics.bookingsByStatus}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {analytics.bookingsByStatus.map((_, index) => (
                                                <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Paper>
                        ) : null}

                        {analytics.total_bookings === 0 && (
                            <Paper
                                elevation={0}
                                sx={{ p: 6, border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center' }}
                            >
                                <BarChartIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No bookings yet
                                </Typography>
                                <Typography variant="body2" color="text.disabled">
                                    Analytics will appear once people start booking this event.
                                </Typography>
                            </Paper>
                        )}
                    </Stack>
                )}
            </Container>
        </Box>
    );
};
