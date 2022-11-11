/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ResponseError } from '$api/openapi';
// eslint-disable-next-line import/no-named-as-default
import toast from 'svelte-french-toast';

export const addSuccessToast = (subtitle = '') => {
	toast.success(subtitle);
};

export const addErrorToast = (subtitle = '') => {
	toast.error(subtitle);
};

/**
 * Attempts to parse a `ResponseError` into a toast message.
 */
export const handleApiError = async (error: unknown) => {
	let message = '';
	console.error(error);
	if (error instanceof ResponseError) {
		const data: unknown = await error.response.json();
		console.error(data);
		if (
			data &&
			typeof data === 'object' &&
			'message' in data &&
			typeof data.message === 'string'
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			message = data.message;
		}
	}

	toast.error(message);
};

export const addToast = (options: ToastItem) => {
	// TODO: check all implementations to see
	// if we can only keep one of title and subtitle
	if (options.props.kind === 'error') {
		toast.error(options.props.subtitle ?? '');
	} else if (options.props.kind === 'success') {
		toast.success(options.props.subtitle ?? '');
	}
};

interface ToastItem {
	duration?: number;
	props: { title: string; subtitle?: string; kind: 'success' | 'error' };
}
