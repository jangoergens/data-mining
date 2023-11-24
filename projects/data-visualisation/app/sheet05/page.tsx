'use client';

import { CountryChart } from '@/components/Charts';
import { Button, Divider, Heading } from '@chakra-ui/react';
import { useState } from 'react';

type DataFormat = {
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
	const [displayResult, setDisplayResult] = useState(false);
	const [processing, setProcessing] = useState('No Data has been processed yet.');

	const analyzeData = () => {
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet05/life_expectancy_data.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been processed.');
	};

	return (
		<>
			<Heading size="lg">Sheet 04</Heading>
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
		</>
	);
}
