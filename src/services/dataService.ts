import { supabase } from '@/utils/supabase';
import type { Event, CreateEvent, Favorite, Booking } from '@/utils/schemas';

export const dataService = {
    async getEvents() {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('start_date', { ascending: true });

        if (error) throw error;
        return data as Event[];
    },

    async getEventById(id: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Event;
    },

    async createEvent(event: CreateEvent) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('events')
            .insert({
                ...event,
                user_id: user.id,
            })
            .select()
            .single();

        if (error) throw error;
        return data as Event;
    },

    async updateEvent(id: string, updates: Partial<CreateEvent>) {
        const { data, error } = await supabase
            .from('events')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Event;
    },

    async deleteEvent(id: string) {
        const { error } = await supabase
            .from('events')
            .update({ status: 'cancelled' })
            .eq('id', id);

        if (error) throw error;
    },

    async getFavorites() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: favoriteIds, error: favError } = await supabase
            .from('favorites')
            .select('item_id, id')
            .eq('user_id', user.id)
            .eq('item_type', 'event');

        if (favError) throw favError;
        if (!favoriteIds || favoriteIds.length === 0) return [];

        const eventIds = favoriteIds.map(f => f.item_id);

        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .in('id', eventIds);

        if (eventsError) throw eventsError;

        return (favoriteIds.map(fav => ({
            id: fav.id,
            events: events?.find(e => e.id === fav.item_id)
        })).filter(f => f.events) as (Favorite & { events: Event })[]);
    },

    async addFavorite(eventId: string) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: existing, error: checkError } = await supabase
            .from('favorites')
            .select('*')
            .eq('item_id', eventId)
            .eq('user_id', user.id)
            .maybeSingle();

        if (checkError) throw checkError;
        if (existing) return existing;

        const { data, error } = await supabase
            .from('favorites')
            .insert({
                user_id: user.id,
                item_id: eventId,
                item_type: 'event',
            })
            .select()
            .single();

        if (error) throw error;
        return data as Favorite;
    },

    async removeFavorite(eventId: string) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('item_id', eventId);

        if (error) throw error;
    },

    async isFavorite(eventId: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('item_id', eventId)
            .maybeSingle();

        if (error) throw error;
        return !!data;
    },

    async getUserBookings() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                events!bookings_event_id_fkey (*)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as (Booking & { events: Event })[];
    },

    async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('bookings')
            .insert({
                ...booking,
                user_id: user.id,
            })
            .select()
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async searchEvents(query: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            .order('start_date', { ascending: true });

        if (error) throw error;
        return data as Event[];
    },

    async getEventsByCategory(category: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('category', category)
            .order('start_date', { ascending: true });

        if (error) throw error;
        return data as Event[];
    },

    async getUserEvents() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Event[];
    },
};
