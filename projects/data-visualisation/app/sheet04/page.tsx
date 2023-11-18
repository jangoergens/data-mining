'use client';

import { CountryChart } from '@/components/Charts';
import { Divider, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export type Data = {
	field: {
		0: string;
		1: number;
		2: string;
		3: string;
		4: string;
		5: number;
	};
};

export type FormattedData = {
	country: string;
	sex: string;
	unit: string;
	value: number;
	year: number;
};

export default function Sheet04() {
	const [data, setData] = useState<FormattedData[]>([]);

	useEffect(() => {
		fetch('/api/xml-parser')
			.then((response) => response.json() as Promise<Data[]>)
			.then((data) => {
				const renamedList: FormattedData[] = data?.map((item) => ({
					country: item.field[0],
					sex: item.field[2],
					unit: item.field[4],
					value: item.field[5],
					year: item.field[1],
				}));

				setData(renamedList);
			})
			.catch((error) => console.error('Error:', error));
	}, []);

	const grouped: Record<string, FormattedData[]> = {};
	data.forEach((item) => {
		const key = item.country;
		if (!grouped[key]) {
			grouped[key] = [];
		}
		grouped[key].push(item);
	});

	return (
		<>
			<Heading size="lg">Sheet 04</Heading>
			<Divider />
			{Object.keys(grouped).map(
				(key) =>
					key === 'Austria' && (
						<div key={key}>
							<Heading>{key}</Heading>
							<CountryChart data={grouped[key]} />
						</div>
					),
			)}

			{/* <div className="flex items-center gap-2"></div> */}
		</>
	);
}
