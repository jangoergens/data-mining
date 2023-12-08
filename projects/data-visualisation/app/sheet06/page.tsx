'use client';

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
import { mean, quantile, standardDeviation, sum } from 'simple-statistics';

export type DataFormat = {
	item1: string | undefined;
	item2: string | undefined;
	item3: string | undefined;
	item4: string | undefined;
	item5: string | undefined;
	item6: string | undefined;
	item7: string | undefined;
	item8: string | undefined;
	item9: string | undefined;
	item10: string | undefined;
	item11: string | undefined;
	item12: string | undefined;
	item13: string | undefined;
	item14: string | undefined;
	item15: string | undefined;
	item16: string | undefined;
	item17: string | undefined;
	item18: string | undefined;
	item19: string | undefined;
	item20: string | undefined;
	item21: string | undefined;
	item22: string | undefined;
	item23: string | undefined;
	item24: string | undefined;
	item25: string | undefined;
	item26: string | undefined;
	item27: string | undefined;
	item28: string | undefined;
	item29: string | undefined;
	item30: string | undefined;
	item31: string | undefined;
	item32: string | undefined;
	itemCount: string | undefined;
};

export default function Sheet06() {
	const [graphics, setGraphics] = useState<JSX.Element>();
	const [displayResult, setDisplayResult] = useState(false);
	const [processing, setProcessing] = useState('No Data has been processed yet.');

	const analyzeData = () => {
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet06/groceries.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been processed.');
	};

	const exploreData = () => {
		setDisplayResult(false);
		setProcessing('Processing...');

		fetch('/api/csv-parser?fileName=sheet06/groceries.csv')
			.then((response) => response.json() as Promise<DataFormat[]>)
			.then((data) => {
				const itemCount = data.map((item) => Number(item.itemCount));
				const table = (
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th></Th>
									<Th isNumeric>Purchases</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>count</Td>
									<Td isNumeric>{itemCount.length}</Td>
								</Tr>
								<Tr>
									<Td>sum items</Td>
									<Td isNumeric>{sum(itemCount)}</Td>
								</Tr>
								<Tr>
									<Td>mean</Td>
									<Td isNumeric>{mean(itemCount).toFixed(2)}</Td>
								</Tr>
								<Tr>
									<Td>std</Td>
									<Td isNumeric>{standardDeviation(itemCount).toFixed(2)}</Td>
								</Tr>
								<Tr>
									<Td>min</Td>
									<Td isNumeric>{Math.min(...itemCount)}</Td>
								</Tr>
								<Tr>
									<Td>25%</Td>
									<Td isNumeric>{quantile(itemCount, 0.25)}</Td>
								</Tr>
								<Tr>
									<Td>50%</Td>
									<Td isNumeric>{quantile(itemCount, 0.5)}</Td>
								</Tr>
								<Tr>
									<Td>75%</Td>
									<Td isNumeric>{quantile(itemCount, 0.75)}</Td>
								</Tr>
								<Tr>
									<Td>max</Td>
									<Td isNumeric>{Math.max(...itemCount)}</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				);

				setGraphics(table);
			})
			.catch((error) => console.error('Error:', error));

		setProcessing('Data has been explored.');
	};

	return (
		<>
			<Heading size="lg">Sheet 06</Heading>
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
