import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Stack,
    InputAdornment,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    Event as EventIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    People as PeopleIcon,
    Description as DescriptionIcon,
    Category as CategoryIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEvent, useUpdateEvent, useDeleteEvent } from '@/hooks/useEvents';
import { AppHeader } from '@/components/navigation/AppHeader';
import { ImageUploadZone } from '@/components/ImageUploadZone';
import { eventCategories } from '@/utils/schemas';
import type { CreateEvent } from '@/utils/schemas';

export const UpdateEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: event, isLoading, error } = useEvent(id!);
    const updateEvent = useUpdateEvent();
    const deleteEvent = useDeleteEvent();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateEvent>({
        defaultValues: {
            title: '',
            description: '',
            location: '',
            category: 'Music',
            start_date: new Date(),
            end_date: new Date(),
            ticket_price: 0,
            max_participants: 50,
            image: '',
            featured: false,
        }
    });

    useEffect(() => {
        if (event) {
            reset({
                title: event.title,
                description: event.description || '',
                location: event.location || '',
                category: event.category,
                start_date: new Date(event.start_date),
                end_date: new Date(event.end_date),
                ticket_price: event.ticket_price || 0,
                max_participants: event.max_participants || 50,
                image: event.image || '',
                featured: event.featured,
            });
        }
    }, [event, reset]);

    const onSubmit = async (data: CreateEvent) => {
        try {
            await updateEvent.mutateAsync({ id: id!, updates: data });
            navigate(`/events/${id}`);
        } catch {
            // Error handled by mutation
        }
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteEvent.mutateAsync(id!);
            navigate('/events/manage');
        } catch {
            setDeleteDialogOpen(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppHeader />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    if (error || !event) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppHeader />
                <Container maxWidth="md" sx={{ pt: 3 }}>
                    <Alert severity="error">Failed to load event details.</Alert>
                    <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                        Go Back
                    </Button>
                </Container>
            </Box>
        );
    }

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
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box textAlign="center">
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <EventIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Edit Event
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Update your event details
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Event Title
                                </Typography>
                                <Controller
                                    name="title"
                                    control={control}
                                    rules={{ required: 'Title is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            placeholder="Enter event title"
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EventIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Description
                                </Typography>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            placeholder="Tell us about your event"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DescriptionIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Category
                                </Typography>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CategoryIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {eventCategories.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Location
                                </Typography>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            placeholder="Event location"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                        Start Date & Time
                                    </Typography>
                                    <Controller
                                        name="start_date"
                                        control={control}
                                        render={({ field: { value, onChange, ...field } }) => {
                                            const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
                                            return (
                                                <DateTimePicker
                                                    value={dateValue}
                                                    onChange={onChange}
                                                    {...field}
                                                    sx={{ width: '100%' }}
                                                />
                                            );
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                        End Date & Time
                                    </Typography>
                                    <Controller
                                        name="end_date"
                                        control={control}
                                        render={({ field: { value, onChange, ...field } }) => {
                                            const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
                                            return (
                                                <DateTimePicker
                                                    value={dateValue}
                                                    onChange={onChange}
                                                    {...field}
                                                    sx={{ width: '100%' }}
                                                />
                                            );
                                        }}
                                    />
                                </Box>
                            </LocalizationProvider>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Ticket Price
                                </Typography>
                                <Controller
                                    name="ticket_price"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            placeholder="0.00"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MoneyIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                                    Max Participants
                                </Typography>
                                <Controller
                                    name="max_participants"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            fullWidth
                                            placeholder="50"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUploadZone
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            label="Event Image"
                                        />
                                    )}
                                />
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="large"
                                    fullWidth
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteClick}
                                    disabled={deleteEvent.isPending}
                                >
                                    {deleteEvent.isPending ? 'Cancelling...' : 'Cancel Event'}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={updateEvent.isPending}
                                    sx={{
                                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5558E3 0%, #DB3A8B 100%)',
                                        },
                                    }}
                                >
                                    {updateEvent.isPending ? 'Updating...' : 'Update Event'}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Container>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Cancel Event?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this event? This action will mark the event as cancelled and it will no longer be visible to users. This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} variant="outlined">
                        Keep Event
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteEvent.isPending}
                        startIcon={<DeleteIcon />}
                    >
                        {deleteEvent.isPending ? 'Cancelling...' : 'Cancel Event'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
