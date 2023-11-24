'use client';

import type { HistoryItem } from '@/data/sheet03/consensus';

import { FormattedData as Sheet04DataFormat } from '@/app/sheet04/page';
import { DataFormat as Sheet05DataFormat } from '@/app/sheet05/page';
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

export const EducationCountryChart = (props: { data: Sheet04DataFormat[]; yAxisName: string }) => {
	const grouped: Record<string, Sheet04DataFormat[]> = {};
	props.data
		.sort((a, b) => a.year - b.year)
		.forEach((item) => {
			const key = item.year;
			if (!grouped[key]) {
				grouped[key] = [];
			}
			grouped[key].push(item);
		});

	const formattedData = Object.keys(grouped).map((year) => {
		const yearData = grouped[year];
		let maleSum = 0,
			femaleSum = 0,
			allSum = 0;

		yearData.forEach((item) => {
			switch (item.sex) {
				case 'Male':
					maleSum += item.value;
					break;
				case 'Female':
					femaleSum += item.value;
					break;
				default:
					allSum += item.value;
					break;
			}
		});
		return {
			all: allSum === 0 ? undefined : allSum,
			female: femaleSum === 0 ? undefined : femaleSum,
			male: maleSum === 0 ? undefined : maleSum,
			year: parseInt(year, 10),
		};
	});

	return (
		<LineChart
			data={formattedData}
			height={400}
			margin={{ bottom: 10, left: 30, right: 10, top: 10 }}
			width={800}
		>
			<XAxis
				dataKey="year"
				label={{
					position: { x: 300, y: -10 },
					value: 'Year',
				}}
			/>
			<YAxis
				label={{
					angle: -90,
					position: { x: -10, y: 80 },
					value: props.yAxisName,
				}}
				tickFormatter={(tick) =>
					tick >= 1000 ? `${((tick as number) / 1000).toFixed(1)}K` : `${tick}`
				}
			/>
			<Tooltip />
			<Legend />
			<Line connectNulls={true} dataKey="male" dot={false} stroke="blue" type="monotone" />;
			<Line connectNulls={true} dataKey="female" dot={false} stroke="red" type="monotone" />;
			<Line connectNulls={true} dataKey="all" dot={false} stroke="green" type="monotone" />;
		</LineChart>
	);
};

export const EduLifeCountryChart = (props: { data: Sheet05DataFormat[] }) => {
	return (
		<LineChart
			data={props.data}
			height={400}
			margin={{ bottom: 10, left: 30, right: 20, top: 10 }}
			width={800}
		>
			<XAxis
				dataKey="year"
				domain={[2000, 2015]}
				label={{
					position: { x: 300, y: -10 },
					value: 'Year',
				}}
				tickCount={0}
				type="number"
			/>
			<YAxis
				domain={[0, 100]}
				label={{
					angle: -90,
					position: { x: -10, y: 80 },
					value: 'Life Expectancy',
				}}
				yAxisId="left"
			/>
			<YAxis
				domain={[0, 20]}
				label={{
					angle: -90,
					position: { x: 45, y: 80 },
					value: 'Years of Schooling',
				}}
				orientation="right"
				yAxisId="right"
			/>
			<Tooltip />
			<Legend />
			<Line dataKey="lifeExpectancy" stroke="green" type="monotone" yAxisId="left" />;
			<Line dataKey="schooling" stroke="blue" type="monotone" yAxisId="right" />;
		</LineChart>
	);
};
