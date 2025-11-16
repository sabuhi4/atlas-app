import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    HelpOutline as HelpIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { AppHeader } from '@/components/navigation/AppHeader';

const faqs = [
    {
        question: 'How do I book tickets for an event?',
        answer: 'To book tickets, navigate to the event details page, click the "Book Tickets" button, fill in your personal information, select your seats, and complete the payment process.',
    },
    {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking from the Tickets page. Please note that cancellation policies may vary depending on the event organizer.',
    },
    {
        question: 'How do I create an event?',
        answer: 'Click the "Create Event" button in the navigation bar, fill in all the event details including title, description, date, location, and pricing, then submit the form.',
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards, debit cards, and online payment methods. Your payment information is securely processed.',
    },
    {
        question: 'How do I find my tickets?',
        answer: 'All your tickets are available in the "Tickets" section. You can access them from the navigation bar at any time.',
    },
    {
        question: 'Can I edit an event I created?',
        answer: 'Yes, you can edit your events from the "My Events" page. Click on the event you want to edit and select "Edit Event".',
    },
    {
        question: 'How do I add events to my favorites?',
        answer: 'Click the heart icon on any event card to add it to your favorites. You can view all your favorite events in the "Favorites" section.',
    },
    {
        question: 'Is there a refund policy?',
        answer: 'Refund policies are determined by the event organizer. Please check the event details or contact the organizer directly for their specific refund policy.',
    },
];

export const Help: React.FC = () => {
    const navigate = useNavigate();

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
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{ color: 'white', mb: 3 }}
                    >
                        Back
                    </Button>
                    <Box textAlign="center">
                        <HelpIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                        <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
                            Help & Support
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Frequently Asked Questions
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                    }}
                >
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                '&:before': { display: 'none' },
                                boxShadow: 'none',
                                border: 'none',
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>
            </Container>
        </Box>
    );
};
