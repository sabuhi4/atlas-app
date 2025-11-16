import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

export const formatSmartDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;

    if (isToday(dateObj)) {
        return `Today, ${format(dateObj, 'h:mm a')}`;
    }

    if (isTomorrow(dateObj)) {
        return `Tomorrow, ${format(dateObj, 'h:mm a')}`;
    }

    if (isThisWeek(dateObj)) {
        return format(dateObj, 'EEEE, h:mm a');
    }

    return format(dateObj, 'MMM d, h:mm a');
};

export const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === 0) {
        return 'Free';
    }

    return `$${price.toFixed(2)}`;
};
