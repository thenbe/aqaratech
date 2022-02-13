import { isEqual, startCase } from 'lodash-es';
import { get, writable, type Writable } from 'svelte/store';

type Head = {
	key: string;
	label: string;
	visible: boolean;
};

function isSameTable(a: Head[], b: Head[]) {
	const isIdentical = isEqual(
		a.map((head) => head.key),
		b.map((head) => head.key),
	);
	console.log({ isIdentical }, 'columns.ts ~ 15');
	return isIdentical;
}

function deriveHeads(rows: any[]): Head[] {
	return Object.keys(rows[0]).map((key) => ({
		key,
		label: startCase(key),
		visible: true,
	}));
}

function createColumns() {
	const { subscribe, set, update } = <Writable<Head[]>>writable([]);

	return {
		subscribe,
		reset: () => set([]),
		newTable: (rows: any[]) => {
			const heads = deriveHeads(rows);
			if (!isSameTable(heads, get(columns))) {
				set(heads);
			}
		},
		toggle: (key: string, visible: boolean) =>
			update((n) => n.map((h) => (h.key === key ? { ...h, visible } : h))),
	};
}

export const columns = createColumns();
