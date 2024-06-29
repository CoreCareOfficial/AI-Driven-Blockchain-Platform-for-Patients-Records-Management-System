// utils/formatTime.js
import { formatDistanceToNow, parseISO } from 'date-fns';

export function FormatRelativeTime(timestamp) {
    if (!timestamp) {
        return '----';
    }
    try {
        const date = parseISO(timestamp);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
        console.error('Error parsing timestamp:', error);
        return '----';
    }
}
