'use client';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

export const ExampleChart = () => {
	const data = [
		{
			amt: 2400,
			name: 'Page A',
			pv: 2400,
			uv: 4000,
		},
		{
			amt: 2210,
			name: 'Page B',
			pv: 1398,
			uv: 3000,
		},
		{
			amt: 2290,
			name: 'Page C',
			pv: 9800,
			uv: 2000,
		},
		{
			amt: 2000,
			name: 'Page D',
			pv: 3908,
			uv: 2780,
		},
		{
			amt: 2181,
			name: 'Page E',
			pv: 4800,
			uv: 1890,
		},
		{
			amt: 2500,
			name: 'Page F',
			pv: 3800,
			uv: 2390,
		},
		{
			amt: 2100,
			name: 'Page G',
			pv: 4300,
			uv: 3490,
		},
	];

	return (
		<LineChart
			data={data}
			height={300}
			margin={{ bottom: 5, left: 0, right: 20, top: 5 }}
			width={600}
		>
			<Line dataKey="uv" stroke="#8884d8" type="monotone" />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey="name" />
			<YAxis />
		</LineChart>
	);
};
