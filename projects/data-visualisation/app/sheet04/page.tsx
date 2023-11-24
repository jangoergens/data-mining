'use client';

import { EducationCountryChart as CountryChart } from '@/components/Charts';
import { Button, Divider, Heading, Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react';
import { useState } from 'react';

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

type FileName =
	| 'primary_education_numbers'
	| 'public_expenditure_percentage_gdp'
	| 'public_expenditure_percentage_total'
	| 'secondary_education_percentage'
	| 'tertiary_education_numbers';

export default function Sheet04() {
	const [countryCharts, setCountryCharts] = useState<JSX.Element[]>([]);
	const [displayResult, setDisplayResult] = useState(false);
	const [fileNameSelection, setFileNameSelection] = useState<FileName>('primary_education_numbers');
	const [processing, setProcessing] = useState('No Data has been processed yet.');

	const analyzeData = (fileName: FileName) => {
		const grouped: Record<string, FormattedData[]> = {};
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/xml-parser?fileName=' + fileName)
			.then((response) => response.json() as Promise<Data[]>)
			.then((data) => {
				const renamedList: FormattedData[] = data?.map((item) => ({
					country: item.field[0],
					sex: item.field[2],
					unit: item.field[4],
					value: item.field[5],
					year: item.field[1],
				}));

				renamedList.forEach((item) => {
					const key = item.country;
					if (!grouped[key]) {
						grouped[key] = [];
					}
					grouped[key].push(item);
				});

				const yAxisNameMap: Record<string, string> = {
					primary_education_numbers: 'Number of Students',
					public_expenditure_percentage_gdp: 'Public Expenditure Percentage GDP',
					public_expenditure_percentage_total: 'Public Expenditure Percentage Total',
					secondary_education_percentage: 'Secondary Education Percentage',
					tertiary_education_numbers: 'Number of Students',
				};

				renderCountryCharts(grouped, yAxisNameMap[fileName]);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been processed.');
	};

	const renderCountryCharts = (grouped: Record<string, FormattedData[]>, yAxisName: string) => {
		setCountryCharts(
			Object.keys(grouped).map((key) => (
				<div key={key}>
					<Heading>{key}</Heading>
					<CountryChart data={grouped[key]} yAxisName={yAxisName} />
				</div>
			)),
		);
	};

	return (
		<>
			<Heading size="lg">Sheet 04</Heading>
			<Divider />
			<VStack align={'center'}>
				<RadioGroup
					onChange={(value: FileName) => setFileNameSelection(value)}
					value={fileNameSelection}
				>
					<Stack>
						<Radio value="primary_education_numbers">Primary Education Numbers</Radio>
						<Radio value="secondary_education_percentage">Secondary Education Percentage</Radio>
						<Radio value="tertiary_education_numbers">Tertiary Education Numbers</Radio>
						<Radio value="public_expenditure_percentage_gdp">
							Public Expenditure Percentage GDP
						</Radio>
						<Radio value="public_expenditure_percentage_total">
							Public Expenditure Percentage Total
						</Radio>
					</Stack>
				</RadioGroup>
				<Button colorScheme="blue" onClick={() => analyzeData(fileNameSelection)} size="lg">
					Process Data
				</Button>
			</VStack>
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
