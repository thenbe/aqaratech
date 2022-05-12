import type { InferQueryOutput } from '$lib/client/trpc';
import { getColor } from '$lib/config/constants';
import { getAddress } from '$lib/utils/common';
import { getMonths } from '$lib/utils/group';
import { Chart } from 'chart.js/dist/chart.esm';
import { closestTo, isSameDay } from 'date-fns';
import * as R from 'remeda';
import { currencyTooltip } from './utils/currency';

type Data = InferQueryOutput<'owner:charts:income'>;
type GroupBy = 'ratio' | 'property';
type ChartConfig = {
	data: Data;
	groupBy: GroupBy;
};

const normalize = (data: Data) =>
	data.properties.flatMap((property) =>
		property.units.flatMap((unit) =>
			unit.leases.flatMap((lease) =>
				lease.transactions.flatMap((transaction) => {
					const { amount, isPaid, postAt } = transaction;
					const address = getAddress(property);
					const { propertyId } = unit;
					return { amount, isPaid, postAt, address, propertyId };
				}),
			),
		),
	);

const sort = (data: Data) => R.sortBy(normalize(data), (item) => item.postAt);

type Bucket = {
	total: number;
	date: Date;
	address: string;
	propertyId: string;
	isPaid: boolean;
};
const aggregate = (data: Data, groupBy: GroupBy): Bucket[] => {
	const sorted = sort(data);
	const months = getMonths(sorted);

	const buckets: Bucket[] = [];

	sorted.forEach((trx) => {
		const month = closestTo(trx.postAt, months);
		if (month) {
			// search for the bucket with the same date  propertyId
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.propertyId === trx.propertyId
						: bucket.isPaid === trx.isPaid;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					address: trx.address,
					propertyId: trx.propertyId,
					isPaid: trx.isPaid,
				});
			}
		}
	});
	if (groupBy === 'ratio') {
		buckets.sort((a, b) => +b.isPaid - +a.isPaid); // true first
	} else if (groupBy === 'property') {
		buckets.sort((a, b) => a.address.localeCompare(b.address)); // alphabetical
	}
	return buckets;
};

const getLabel = <T>(group: T, groupBy: GroupBy): string => {
	if (groupBy === 'ratio' || typeof group === 'boolean') {
		return group ? 'Paid' : 'Unpaid';
	} else if (typeof group === 'string') {
		return group;
	} else {
		return '';
	}
};

const getDatasets = (data: Data, groupBy: GroupBy) => {
	const aggregated = aggregate(data, groupBy);
	const groups = aggregated
		.map((item) => (groupBy === 'property' ? item.address : item.isPaid))
		.filter((value, index, self) => self.indexOf(value) === index);

	const datasets = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: getLabel(group, groupBy),
			data:
				groupBy === 'property'
					? aggregated.filter((item) => item.address === group)
					: aggregated.filter((item) => item.isPaid === group),
			parsing: {
				yAxisKey: 'total',
				xAxisKey: 'date',
			},
			backgroundColor,
			borderRadius: 10,
		};
	});
	return datasets;
};

export function incomeChart(node: HTMLCanvasElement, config: ChartConfig) {
	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets: getDatasets(config.data, config.groupBy),
		},
		options: {
			scales: {
				x: {
					type: 'time',
					stacked: true,
					grid: {
						display: false,
						// drawBorder: false,
					},
				},
				y: {
					stacked: true,
					ticks: {
						// maxTicksLimit: 6,
						autoSkipPadding: 50,
						format: Intl.NumberFormat('en-GB', {
							notation: 'compact',
						}).resolvedOptions(),
					},
					grace: '20%',
					grid: {
						drawTicks: false,
						drawBorder: false,
					},
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						label: currencyTooltip,
					},
				},
			},
		},
	});

	return {
		update(newChartConfig: ChartConfig) {
			chart.data.datasets = getDatasets(
				newChartConfig.data,
				newChartConfig.groupBy,
			);
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
