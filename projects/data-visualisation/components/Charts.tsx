'use client';

import type { HistoryItem } from '@/data/sheet03/consensus';

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
export const ConsensusChart = (props: { data: HistoryItem[] }) => {
	return (
		<LineChart
			data={props.data}
			height={400}
			margin={{ bottom: 10, left: 30, right: 10, top: 10 }}
			width={800}
		>
			<XAxis
				dataKey="iteration"
				label={{
					position: { x: 300, y: -10 },
					value: 'Iterations',
				}}
				tickFormatter={(tick) =>
					tick >= 1000 ? `${((tick as number) / 1000).toFixed(1)}K` : `${tick}`
				}
			/>
			<YAxis
				allowDecimals={false}
				domain={[0, props.data[0].A + props.data[0].B]}
				label={{
					angle: -90,
					position: { x: -10, y: 80 },
					value: 'Number of Agents',
				}}
				tickFormatter={(tick) =>
					tick >= 1000 ? `${((tick as number) / 1000).toFixed(1)}K` : `${tick}`
				}
			/>
			<Tooltip />
			<Legend />
			<Line dataKey="A" dot={false} stroke="blue" type="monotone" />
			<Line dataKey="B" dot={false} stroke="green" type="monotone" />
			<Line dataKey="undecided" dot={false} stroke="red" type="monotone" />
		</LineChart>
	);
};
