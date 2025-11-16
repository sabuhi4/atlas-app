import { z } from 'zod';

export const eventCategories = ['Music', 'Sports', 'Art', 'Tech', 'Food', 'Education', 'Business'] as const;

export const EventSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    location: z.string().optional(),
    category: z.enum(eventCategories),
    featured: z.boolean().default(false),
    start_date: z.union([z.string(), z.date()]),
    end_date: z.union([z.string(), z.date()]),
    ticket_price: z.number().min(0).optional(),
    max_participants: z.number().positive().optional(),
    image: z.string().url().optional(),
    member_avatars: z.array(z.string()).default([]),
    member_count: z.number().default(0),
    status: z.string().default('active'),
    created_at: z.string(),
    updated_at: z.string(),
});

export const CreateEventSchema = EventSchema.omit({
    id: true,
    user_id: true,
    member_avatars: true,
    member_count: true,
    created_at: true,
    updated_at: true,
    status: true,
});

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    full_name: z.string().optional(),
    avatar_url: z.string().url().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    user_interests: z.array(z.string()).default([]),
    notifications_enabled: z.boolean().default(true),
    language: z.string().default('en'),
    dark_mode: z.boolean().default(false),
    created_at: z.string(),
    updated_at: z.string(),
    last_login: z.string().optional(),
});

export const BookingSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    event_id: z.string().uuid(),
    order_number: z.string(),
    total_amount: z.number(),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'refunded']),
    payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']),
    payment_method_id: z.string().uuid().optional(),
    selected_seats: z.array(z.object({
        seat: z.string(),
        type: z.string(),
        row: z.number(),
        column: z.number(),
        price: z.number(),
    })),
    created_at: z.string(),
    updated_at: z.string(),
    confirmed_at: z.string().optional(),
});

export const FavoriteSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    event_id: z.string().uuid(),
    created_at: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
export type User = z.infer<typeof UserSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type Favorite = z.infer<typeof FavoriteSchema>;
export type EventCategory = typeof eventCategories[number];
