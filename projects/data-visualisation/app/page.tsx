'use client';

import type { Model, SimulationResult } from '@/data/sheet03/consensus';

import { ConsensusChart } from '@/components/Charts';
import { runSimulation } from '@/data/sheet03/consensus';
import {
	Button,
	Divider,
	Heading,
	NumberInput,
	NumberInputField,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const [agentsAmount, setAgentsAmount] = useState(20);
	const [displayResult, setDisplayResult] = useState(false);
	const [modelChoice, setModelChoice] = useState<Model>('two-choices');
	const [simulationResult, setSimulationResult] = useState<SimulationResult>({
		history: [],
		message: 'Run similuation to display results.',
	});

	const handleSimulation = () => {
		setSimulationResult({ history: [], message: 'Running simulation...' });

		setTimeout(() => {
			const result = runSimulation(agentsAmount, modelChoice);
			setSimulationResult(result);
		}, 0);
	};

	return (
		<main className="flex min-h-screen flex-col items-center gap-4 p-24">
			<Heading size="lg">{simulationResult.message}</Heading>
			<Divider />
			<div className="flex items-center gap-2">
				<NumberInput
					defaultValue={agentsAmount}
					max={999999}
					min={4}
					onChange={(valueString) => setAgentsAmount(parseInt(valueString))}
					placeholder="Number of Agents"
					size="lg"
				>
					<NumberInputField />
				</NumberInput>
				<RadioGroup onChange={(value: Model) => setModelChoice(value)} value={modelChoice}>
					<Stack>
						<Radio value="two-choices">Two-Choices</Radio>
						<Radio value="three-majority">3-Majority</Radio>
						<Radio value="undecided-state-dynamics">Undecided State Dynamics</Radio>
					</Stack>
				</RadioGroup>
				<Button colorScheme="blue" onClick={handleSimulation} size="lg">
					Run Simulation
				</Button>
			</div>
			<Divider />

			<Button colorScheme="blue" onClick={() => setDisplayResult(!displayResult)} size="lg">
				Toggle History Graph
			</Button>

			{displayResult && simulationResult.history.length > 0 && (
				<ConsensusChart data={simulationResult.history}></ConsensusChart>
			)}
		</main>
	);
}
