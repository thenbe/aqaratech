import { subMonths } from 'date-fns';

export const defaultRange = 6;

/**
 * Figures out the date N months ago. Then returns the first day of that month.
 * Therefore, use 0 to get the first day of the current month.
 *
 * Uses UTC. Is agnostic to the client's timezone.
 */
export const rangeStart = (monthsAgo: number): string => {
	// Get the date/time N months ago
	const date = subMonths(new Date(), monthsAgo);

	// Get the equivalent UTC day/month/year
	const month = date.getUTCMonth();
	const year = date.getUTCFullYear();

	// Return a date object that represents midnight on that equivalent UTC day/month/year
	const result = new Date(Date.UTC(year, month, 1)).toISOString();
	return result;
};
