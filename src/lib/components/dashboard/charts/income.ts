import type { InferQueryOutput } from '$lib/client/trpc';
import Chart from 'chart.js/auto/auto.esm'; // TODO treeshake
import 'chartjs-adapter-date-fns';

export function incomeChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:income'>,
) {
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;
	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets: [
				{
					label: 'Paid',
					data: data.filter((i) => i.isPaid),
					parsing: {
						yAxisKey: 'amount',
						xAxisKey: 'date',
					},
					backgroundColor: ['hsl(199, 100%, 18%)'],
					borderRadius: 10,
				},
				{
					borderRadius: 10,
					label: 'Unpaid',
					data: data.filter((i) => !i.isPaid),
					parsing: {
						yAxisKey: 'amount',
						xAxisKey: 'date',
					},
					backgroundColor: ['hsl(348, 83%, 64%)'],
				},
			],
		},
		options: {
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false,
			},
			scales: {
				x: {
					type: 'time',
					time: {
						unit: 'month',
						tooltipFormat: 'MMM yy',
						displayFormats: {
							month: 'MMM',
						},
					},
					stacked: true,
					grid: {
						display: false,
						// drawBorder: false,
					},
				},
				y: {
					stacked: true,
					ticks: {
						callback: (value, index, values) =>
							// hide the first tick
							index == values.length - 1
								? undefined
								: // format the value
								  Intl.NumberFormat('en-GB', {
										notation: 'compact',
								  }).format(Number(value)),
						// maxTicksLimit: 6,
						autoSkip: true,
						autoSkipPadding: 50,
					},
					// grace: '20%',
					grid: {
						drawTicks: false,
						drawBorder: false,
					},
				},
			},
			plugins: {
				legend: {
					align: 'start',
					labels: {
						usePointStyle: true,
						pointStyle: 'rectRounded',
					},
				},
			},
		},
	});

	return {
		update(newData: InferQueryOutput<'charts:income'>) {
			if (chart.data.datasets[0] && chart.data.datasets[1]) {
				chart.data.datasets[0].data = newData.filter((i) => i.isPaid);
				chart.data.datasets[1].data = newData.filter((i) => !i.isPaid);
				chart.update();
			}
		},
		destory() {
			chart.destroy();
		},
	};
}
