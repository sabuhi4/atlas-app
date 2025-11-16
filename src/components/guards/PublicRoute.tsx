import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useUserStore();

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};