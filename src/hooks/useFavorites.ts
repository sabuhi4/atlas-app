import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import { showSuccess, showError } from '@/utils/notifications';
import { useUserStore } from '@/store/userStore';

export const useFavorites = () => {
    const user = useUserStore((state) => state.user);

    return useQuery({
        queryKey: ['favorites'],
        queryFn: dataService.getFavorites,
        enabled: !!user,
    });
};

export const useIsFavorite = (eventId: string) => {
    return useQuery({
        queryKey: ['favorites', eventId],
        queryFn: () => dataService.isFavorite(eventId),
        enabled: !!eventId,
    });
};

export const useAddFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (eventId: string) => dataService.addFavorite(eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            showSuccess('Added to favorites');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to add favorite');
        },
    });
};

export const useRemoveFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (eventId: string) => dataService.removeFavorite(eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            showSuccess('Removed from favorites');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to remove favorite');
        },
    });
};
