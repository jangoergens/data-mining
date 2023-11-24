'use client';

import { EduLifeCountryChart } from '@/components/Charts';
import { Button, Divider, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { sampleCorrelation } from 'simple-statistics';

export type DataFormat = {
	adultMortality: string;
	alcohol: string;
	bmi: string;
	country: string;
	diphtheria: string;
	gdp: string;
	hepatitisB: string;
	hiv: string;
	incomeCompositionOfResources: string;
	infantDeaths: string;
	lifeExpectancy: string;
	measles: string;
	percentageExpenditure: string;
	polio: string;
	population: string;
	schooling: string;
	status: 'Developed' | 'Developing';
	thinnessFiveToNine: string;
	thinnessUnderTwenty: string;
	totalExpenditure: string;
	underFiveDeaths: string;
	year: string;
};

export default function Sheet05() {
	const [correlation, setCorrelation] = useState(0);
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
					Object.keys(grouped).map((key) => {
						const countryData = grouped[key].reverse();

						const lifeExpectancy = countryData.map((item) => Number(item.lifeExpectancy));
						const yearsOfSchooling = countryData.map((item) => Number(item.schooling));
						const countryCorrelation = sampleCorrelation(lifeExpectancy, yearsOfSchooling);

						return (
							<div key={key}>
								<Heading>{key}</Heading>
								<p>Correlation: {countryCorrelation.toFixed(4)}</p>
								<EduLifeCountryChart data={countryData} />
							</div>
						);
					}),
				);

				const lifeExpectancy = data.map((item) => Number(item.lifeExpectancy));
				const yearsOfSchooling = data.map((item) => Number(item.schooling));

				setCorrelation(sampleCorrelation(lifeExpectancy, yearsOfSchooling));
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
			<span>
				{processing && correlation !== 0 && `Correlation Coefficent: ${correlation.toPrecision(4)}`}
			</span>
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
