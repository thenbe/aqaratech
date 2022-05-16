import { writable } from 'svelte/store';

type PaginationButtons = Array<number | null>;
export interface IPagination {
	pageIdx: number;
	pageCount: number;
	pageSize: number;
	itemCount: number;
	buttons: PaginationButtons;
	hasNext: boolean;
	hasPrevious: boolean;
	idxStart: number;
	idxEnd: number;
}

export function createPagination(pgn: IPagination) {
	const { subscribe, update } = writable<IPagination>(pgn);

	return {
		subscribe,
		next: () =>
			update((n) =>
				calculatePagination(Math.min(n.pageIdx + 1, n.pageCount), n),
			),
		previous: () =>
			update((n) => calculatePagination(Math.max(n.pageIdx - 1, 1), n)),
		setPage: (pageIdx: number) =>
			update((n) => calculatePagination(pageIdx, n)),
	};
}

export function getButtons(
	pageIdx: number,
	pageCount: number,
	extended = false,
) {
	if (pageCount === 1) return [1];
	const center = extended
			? [pageIdx - 2, pageIdx - 1, pageIdx, pageIdx + 1, pageIdx + 2]
			: [pageIdx - 1, pageIdx, pageIdx + 1],
		filteredCenter: Array<number | null> = center.filter(
			(p) => p > 1 && p < pageCount,
		),
		includeThreeLeft = pageIdx === 5,
		includeThreeRight = pageIdx === pageCount - 4,
		includeLeftDots = pageIdx > 5,
		includeRightDots = pageIdx < pageCount - 4;

	if (includeThreeLeft) filteredCenter.unshift(2);
	if (includeThreeRight) filteredCenter.push(pageCount - 1);

	if (includeLeftDots) filteredCenter.unshift(null);
	if (includeRightDots) filteredCenter.push(null);

	return [1, ...filteredCenter, pageCount];
}

export const calculatePagination = (
	pageIdx: number,
	pgn: {
		pageCount: number;
		pageSize: number;
		itemCount: number;
	},
): IPagination => {
	const buttons = getButtons(pageIdx, pgn.pageCount);
	const idxStart = (pageIdx - 1) * pgn.pageSize + 1;
	const idxEnd =
		pageIdx === pgn.pageCount ? pgn.itemCount : idxStart + pgn.pageSize;

	return {
		...pgn,
		pageIdx,
		buttons,
		hasPrevious: pageIdx > 1,
		hasNext: pageIdx < pgn.pageCount,
		idxStart,
		idxEnd,
	};
};
