import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import type { CreateEvent } from '@/utils/schemas';
import { showSuccess, showError } from '@/utils/notifications';

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: dataService.getEvents,
        staleTime: 2 * 60 * 1000,
    });
};

export const useEvent = (id: string) => {
    return useQuery({
        queryKey: ['events', id],
        queryFn: () => dataService.getEventById(id),
        enabled: !!id,
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (event: CreateEvent) => dataService.createEvent(event),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            showSuccess('Event created successfully!');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to create event');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<CreateEvent> }) =>
            dataService.updateEvent(id, updates),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            queryClient.invalidateQueries({ queryKey: ['events', variables.id] });
            showSuccess('Event updated successfully!');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to update event');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => dataService.deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            showSuccess('Event cancelled successfully');
        },
        onError: (error: Error) => {
            showError(error.message || 'Failed to cancel event');
        },
    });
};

export const useSearchEvents = (query: string) => {
    return useQuery({
        queryKey: ['events', 'search', query],
        queryFn: () => dataService.searchEvents(query),
        enabled: query.length > 0,
    });
};

export const useEventsByCategory = (category: string) => {
    return useQuery({
        queryKey: ['events', 'category', category],
        queryFn: () => dataService.getEventsByCategory(category),
        enabled: !!category,
    });
};

export const useUserEvents = () => {
    return useQuery({
        queryKey: ['events', 'user'],
        queryFn: dataService.getUserEvents,
    });
};
