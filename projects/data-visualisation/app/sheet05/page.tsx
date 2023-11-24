'use client';

import { EduLifeCountryChart } from '@/components/Charts';
import { Button, Divider, Heading } from '@chakra-ui/react';
import { useState } from 'react';

export type DataFormat = {
	adultMortality: number;
	alcohol: number;
	bmi: number;
	country: string;
	diphtheria: number;
	gdp: number;
	hepatitisB: number;
	hiv: number;
	incomeCompositionOfResources: number;
	infantDeaths: number;
	lifeExpectancy: number;
	measles: number;
	percentageExpenditure: number;
	polio: number;
	population: number;
	schooling: number;
	status: 'Developed' | 'Developing';
	thinnessFiveToNine: number;
	thinnessUnderTwenty: number;
	totalExpenditure: number;
	underFiveDeaths: number;
	year: number;
};

export default function Sheet05() {
	const [countryCharts, setCountryCharts] = useState<JSX.Element[]>([]);
	const [displayResult, setDisplayResult] = useState(false);
	const [processing, setProcessing] = useState('No Data has been processed yet.');

	const analyzeData = () => {
		const grouped: Record<string, DataFormat[]> = {};
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet05/life_expectancy_data.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				data = data.slice(0, 40);
				data.forEach((item) => {
					const key = item.country;
					if (!grouped[key]) {
						grouped[key] = [];
					}
					grouped[key].push(item);
				});
				setCountryCharts(
					Object.keys(grouped).map((key) => (
						<div key={key}>
							<Heading>{key}</Heading>
							<EduLifeCountryChart data={grouped[key].reverse()} />
						</div>
					)),
				);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been processed.');
	};

	return (
		<>
			<Heading size="lg">Sheet 05</Heading>
			<Divider />
			<Button colorScheme="blue" onClick={() => analyzeData()} size="lg">
				Process Data
			</Button>
			<span>{processing}</span>
			<Divider />
			<Button
				colorScheme={displayResult ? 'red' : 'green'}
				onClick={() => setDisplayResult(!displayResult)}
				size="lg"
			>
				Toggle Country Charts
			</Button>
			{displayResult && countryCharts}
		</>
	);
}
