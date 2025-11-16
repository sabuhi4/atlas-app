import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import type { Booking } from '@/utils/schemas';
import { showSuccess, showError } from '@/utils/notifications';
import { useUserStore } from '@/store/userStore';

export const useBookings = () => {
    const user = useUserStore((state) => state.user);

    return useQuery({
        queryKey: ['bookings'],
        queryFn: dataService.getUserBookings,
        enabled: !!user,
    });
};

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'user_id'>) =>
            dataService.createBooking(booking),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            showSuccess('Booking created successfully!');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to create booking');
        },
    });
};
