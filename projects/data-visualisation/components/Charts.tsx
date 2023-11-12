'use client';

import type { HistoryItem } from '@/data/sheet03/consensus';

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
export const ConsensusChart = (props: { data: HistoryItem[] }) => {
	return (
		<LineChart data={props.data} height={400} margin={{ left: 30 }} width={800}>
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
			<Line dataKey="A" stroke="blue" type="monotone" />
			<Line dataKey="B" stroke="green" type="monotone" />
			<Line dataKey="undecided" stroke="red" type="monotone" />
		</LineChart>
	);
};
