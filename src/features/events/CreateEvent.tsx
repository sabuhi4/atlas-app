import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import {
    Event as EventIcon,
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    People as PeopleIcon,
    Description as DescriptionIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCreateEvent } from '@/hooks/useEvents';
import { AppHeader } from '@/components/navigation/AppHeader';
import { ImageUploadZone } from '@/components/ImageUploadZone';
import { eventCategories } from '@/utils/schemas';
import type { CreateEvent as CreateEventType } from '@/utils/schemas';

export const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const createEvent = useCreateEvent();

    const { control, handleSubmit, formState: { errors } } = useForm<CreateEventType>({
        defaultValues: {
            title: '',
            description: '',
            location: '',
            category: 'Music',
            start_date: new Date(),
            end_date: new Date(Date.now() + 3600000),
            ticket_price: 0,
            max_participants: 50,
            image: '',
            featured: false,
        },
    });

    const onSubmit = async (data: CreateEventType) => {
        try {
            await createEvent.mutateAsync(data);
            navigate('/home');
        } catch {
            // Error handled by mutation
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppHeader />

            {/* Gradient Header */}
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
                            <EventIcon sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                        <Typography
                            variant="h3"
                            component="h1"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                                color: 'white',
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            Create New Event
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 400,
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Fill in the details to create your amazing event
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ pb: 8 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Basic Information */}
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 4,
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
                                    Basic Information
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={3}>
                            <Stack spacing={3}>
                                <Controller
                                    name="title"
                                    control={control}
                                    rules={{ required: 'Title is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Event Title"
                                            fullWidth
                                            required
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EventIcon sx={{ color: 'primary.main' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', pt: 2 }}>
                                                        <DescriptionIcon sx={{ color: 'primary.main' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Category"
                                            fullWidth
                                            select
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CategoryIcon sx={{ color: 'primary.main' }} />
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
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Date & Location */}
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 4,
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
                                    Date & Location
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={3}>
                            <Stack spacing={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        name="start_date"
                                        control={control}
                                        render={({ field: { value, onChange, ...field } }) => {
                                            const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
                                            return (
                                                <DateTimePicker
                                                    label="Start Date & Time"
                                                    value={dateValue}
                                                    onChange={onChange}
                                                    {...field}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            required: true,
                                                            InputProps: {
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <CalendarIcon sx={{ color: 'primary.main' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }}
                                    />

                                    <Controller
                                        name="end_date"
                                        control={control}
                                        render={({ field: { value, onChange, ...field } }) => {
                                            const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
                                            return (
                                                <DateTimePicker
                                                    label="End Date & Time"
                                                    value={dateValue}
                                                    onChange={onChange}
                                                    {...field}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            required: true,
                                                            InputProps: {
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <CalendarIcon sx={{ color: 'primary.main' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            },
                                                        },
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </LocalizationProvider>

                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Location"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationIcon sx={{ color: 'primary.main' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Pricing & Capacity */}
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 4,
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
                                    Pricing & Capacity
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={3}>
                            <Stack spacing={3}>
                                <Controller
                                    name="ticket_price"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ticket Price"
                                            type="number"
                                            fullWidth
                                            inputProps={{ min: 0, step: 0.01 }}
                                            helperText="Enter 0 for free events"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MoneyIcon sx={{ color: 'primary.main' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="max_participants"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Maximum Participants"
                                            type="number"
                                            fullWidth
                                            inputProps={{ min: 1 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleIcon sx={{ color: 'primary.main' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Action Buttons */}
                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            onClick={() => navigate(-1)}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={createEvent.isPending}
                            sx={{
                                py: 1.5,
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                },
                            }}
                        >
                            {createEvent.isPending ? 'Creating Event...' : 'Create Event'}
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};
