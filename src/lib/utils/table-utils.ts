import drop from 'lodash-es/drop.js';

export default function assertNever(value: any, message?: string): never {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(message || `Unexpected value: ${value}`);
}

interface TableOptions {
	p?: string;
	pageSize?: string;
	q?: string;
	sortKey?: string;
	sortDir?: string;
}
export interface PaginationInfo {
	size: number;
	start: number;
	pageIndex: number;
}

export const getTableUrl = (url: URL, options: TableOptions): string => {
	const params = new URLSearchParams();
	Object.entries(options).forEach((option) => {
		if (option[1] && typeof option[1] === 'string') {
			params.set(option[0], option[1]);
		}
	});
	const newUrl = `${url.pathname}?${params.toString()}`;
	return newUrl;
};

export function getPaginatedItems<T>(
	items: T[],
	page: number,
	pageSize: number,
) {
	const pg = page || 1;
	const pgSize = pageSize || 100;
	const offset = (pg - 1) * pgSize;
	const pagedItems = drop(items, offset).slice(0, pgSize);
	const startIndex = offset + 1;
	const endIndex = offset + pagedItems.length;
	return {
		pageIndex: pg,
		pageSize: pgSize,
		total: items.length,
		totalPages: Math.ceil(items.length / pgSize),
		data: pagedItems,
		start: startIndex,
		end: endIndex,
	};
}

export const concatIfExists = (strings: (string | null | undefined)[]) => {
	return strings.filter((str) => str).join(' ');
};

export function downloadBlob(blob: Blob, name = 'file.txt') {
	// Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
	const blobUrl = URL.createObjectURL(blob);

	// Create a link element
	const link = document.createElement('a');

	// Set link's href to point to the Blob URL
	link.href = blobUrl;
	link.download = name;

	// Append link to the body
	document.body.appendChild(link);

	// Dispatch click event on the link
	// This is necessary as link.click() does not work on the latest firefox
	link.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window,
		}),
	);

	// Remove link from body
	document.body.removeChild(link);
}
