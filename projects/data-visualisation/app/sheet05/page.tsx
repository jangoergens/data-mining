'use client';

import { EduLifeCountryChart } from '@/components/Charts';
import {
	Button,
	Divider,
	HStack,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { mean, median, quantile, sampleCorrelation, standardDeviation } from 'simple-statistics';

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
	const [graphics, setGraphics] = useState<JSX.Element[]>([]);
	const [displayResult, setDisplayResult] = useState(false);
	const [meanCorrelation, setMeanCorrelation] = useState(0);
	const [medianCorrelation, setMedianCorrelation] = useState(0);
	const [processing, setProcessing] = useState('No Data has been processed yet.');
	const [combinedCorrelation, setCombinedCorrelation] = useState(0);

	const analyzeData = () => {
		const grouped: Record<string, DataFormat[]> = {};
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet05/life_expectancy_data.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				data.forEach((item) => {
					const key = item.country;
					if (!grouped[key]) {
						grouped[key] = [];
					}
					grouped[key].push(item);
				});

				const correlationByCountry: number[] = [];

				setGraphics(
					Object.keys(grouped).map((key) => {
						const countryData = grouped[key].reverse();

						const validData = countryData.filter(
							(item) => Number(item.lifeExpectancy) > 0 && Number(item.schooling) > 0,
						);
						const lifeExpectancy = validData.map((item) => Number(item.lifeExpectancy));
						const yearsOfSchooling = validData.map((item) => Number(item.schooling));
						const countryCorrelation =
							lifeExpectancy.length > 1 && yearsOfSchooling.length > 1
								? sampleCorrelation(lifeExpectancy, yearsOfSchooling)
								: NaN;

						if (!Number.isNaN(countryCorrelation)) {
							correlationByCountry.push(countryCorrelation);
						}

						return (
							<>
								<Heading>{key}</Heading>
								<p>
									Correlation:{' '}
									{Number.isNaN(countryCorrelation)
										? 'Not Available'
										: countryCorrelation.toFixed(4)}
								</p>
								<EduLifeCountryChart data={countryData} />
							</>
						);
					}),
				);
				setMeanCorrelation(mean(correlationByCountry));
				setMedianCorrelation(median(correlationByCountry));

				const validData = data.filter(
					(item) => Number(item.lifeExpectancy) > 0 && Number(item.schooling) > 0,
				);
				const lifeExpectancy = validData.map((item) => Number(item.lifeExpectancy));
				const yearsOfSchooling = validData.map((item) => Number(item.schooling));
				setCombinedCorrelation(sampleCorrelation(lifeExpectancy, yearsOfSchooling));
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been processed.');
	};

	const exploreData = () => {
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet05/life_expectancy_data.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				const lifeExpectancy = data.map((item) => Number(item.lifeExpectancy));
				const schooling = data.map((item) => Number(item.schooling));
				const table = (
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th></Th>
									<Th isNumeric>Life Expectancy</Th>
									<Th isNumeric>Schooling</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>count</Td>
									<Td isNumeric>{lifeExpectancy.length}</Td>
									<Td isNumeric>{schooling.length}</Td>
								</Tr>
								<Tr>
									<Td>mean</Td>
									<Td isNumeric>{mean(lifeExpectancy).toFixed(2)}</Td>
									<Td isNumeric>{mean(schooling).toFixed(2)}</Td>
								</Tr>
								<Tr>
									<Td>std</Td>
									<Td isNumeric>{standardDeviation(lifeExpectancy).toFixed(2)}</Td>
									<Td isNumeric>{standardDeviation(schooling).toFixed(2)}</Td>
								</Tr>
								<Tr>
									<Td>min</Td>
									<Td isNumeric>{Math.min(...lifeExpectancy)}</Td>
									<Td isNumeric>{Math.min(...schooling)}</Td>
								</Tr>
								<Tr>
									<Td>25%</Td>
									<Td isNumeric>{quantile(lifeExpectancy, 0.25)}</Td>
									<Td isNumeric>{quantile(schooling, 0.25)}</Td>
								</Tr>
								<Tr>
									<Td>50%</Td>
									<Td isNumeric>{quantile(lifeExpectancy, 0.5)}</Td>
									<Td isNumeric>{quantile(schooling, 0.5)}</Td>
								</Tr>
								<Tr>
									<Td>75%</Td>
									<Td isNumeric>{quantile(lifeExpectancy, 0.75)}</Td>
									<Td isNumeric>{quantile(schooling, 0.75)}</Td>
								</Tr>
								<Tr>
									<Td>max</Td>
									<Td isNumeric>{Math.max(...lifeExpectancy)}</Td>
									<Td isNumeric>{Math.max(...schooling)}</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				);

				setGraphics([table]);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been explored.');
	};

	function renderCorrelationText(label: string, correlation: number) {
		if (processing && correlation !== 0) {
			return <p>{`${label}: ${correlation.toPrecision(4)}`}</p>;
		}
		return null;
	}

	return (
		<>
			<Heading size="lg">Sheet 05</Heading>
			<Divider />
			<HStack>
				<Button colorScheme="pink" onClick={() => exploreData()} size="lg">
					Explore Data
				</Button>
				<Button colorScheme="blue" onClick={() => analyzeData()} size="lg">
					Process Data
				</Button>
			</HStack>
			<p>{processing}</p>
			{renderCorrelationText('Combined Correlation Coefficient', combinedCorrelation)}
			{renderCorrelationText('Mean Correlation Coefficient by Country', meanCorrelation)}
			{renderCorrelationText('Median Correlation Coefficient by Country', medianCorrelation)}
			<Divider />
			<Button
				colorScheme={displayResult ? 'red' : 'green'}
				onClick={() => setDisplayResult(!displayResult)}
				size="lg"
			>
				Toggle Graphics
			</Button>
			{displayResult && graphics}
		</>
	);
}
