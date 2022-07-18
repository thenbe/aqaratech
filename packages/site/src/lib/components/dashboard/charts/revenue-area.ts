import { Chart } from 'chart.js/dist/chart.esm';

type DataSets = Chart<'polarArea', number[]>['data']['datasets'];
interface Data {
	labels: string[];
	datasets: DataSets;
}

export function revenueArea(node: HTMLCanvasElement, data: Data) {
	const chart = new Chart(node, {
		type: 'polarArea',
		data,
		options: {
			plugins: {
				tooltip: {
					// enabled: false,
				},
				legend: {
					display: false,
				},
			},
		},
	});

	return {
		update(data: Data) {
			chart.data = data;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
