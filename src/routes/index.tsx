import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoute } from '@/components/guards/PublicRoute';
import { CircularProgress, Box } from '@mui/material';

const SignIn = lazy(() => import('@/features/auth/SignIn').then(module => ({ default: module.SignIn })));
const SignUp = lazy(() => import('@/features/auth/SignUp').then(module => ({ default: module.SignUp })));
const ForgotPassword = lazy(() => import('@/features/auth/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import('@/features/auth/ResetPassword').then(module => ({ default: module.ResetPassword })));
const Home = lazy(() => import('@/features/Home').then(module => ({ default: module.Home })));
const Search = lazy(() => import('@/features/Search').then(module => ({ default: module.Search })));
const Favorites = lazy(() => import('@/features/Favorites').then(module => ({ default: module.Favorites })));
const Tickets = lazy(() => import('@/features/Tickets').then(module => ({ default: module.Tickets })));
const TicketDetails = lazy(() => import('@/features/tickets/TicketDetails').then(module => ({ default: module.TicketDetails })));
const Profile = lazy(() => import('@/features/Profile').then(module => ({ default: module.Profile })));
const EventDetails = lazy(() => import('@/features/events/EventDetails').then(module => ({ default: module.EventDetails })));
const CreateEvent = lazy(() => import('@/features/events/CreateEvent').then(module => ({ default: module.CreateEvent })));
const UpdateEvent = lazy(() => import('@/features/events/UpdateEvent').then(module => ({ default: module.UpdateEvent })));
const ManageEvents = lazy(() => import('@/features/events/ManageEvents').then(module => ({ default: module.ManageEvents })));
const BookEvent = lazy(() => import('@/features/bookings/BookEvent').then(module => ({ default: module.BookEvent })));
const SelectSeats = lazy(() => import('@/features/bookings/SelectSeats').then(module => ({ default: module.SelectSeats })));
const Summary = lazy(() => import('@/features/bookings/Summary').then(module => ({ default: module.Summary })));
const Help = lazy(() => import('@/features/support/Help').then(module => ({ default: module.Help })));
const Privacy = lazy(() => import('@/features/support/Privacy').then(module => ({ default: module.Privacy })));
const About = lazy(() => import('@/features/support/About').then(module => ({ default: module.About })));

const LoadingSpinner = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
    </Box>
);

export const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/:id" element={<TicketDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/events/:id/edit" element={<UpdateEvent />} />
                <Route path="/events/create" element={<CreateEvent />} />
                <Route path="/events/manage" element={<ManageEvents />} />
                <Route path="/bookings/:id" element={<BookEvent />} />
                <Route path="/bookings/:id/select-seats" element={<SelectSeats />} />
                <Route path="/bookings/:id/summary" element={<Summary />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
                <Route path="/auth/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
            </Routes>
        </Suspense>
    );
};