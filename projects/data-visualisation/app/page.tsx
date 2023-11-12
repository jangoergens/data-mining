'use client';

import type { Model } from '@/data/sheet03/consensus';

import { runSimulation } from '@/data/sheet03/consensus';
import {
	Button,
	Divider,
	NumberInput,
	NumberInputField,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const [agentsAmount, setAgentsAmount] = useState(20);
	const [modelChoice, setModelChoice] = useState<Model>('two-choices');
	const [simulationResult, setSimulationResult] = useState('Run similuation to display results.');

	return (
		<main className="flex min-h-screen flex-col items-center gap-4 p-24">
			<span>{simulationResult}</span>
			<Divider />
			<div className="flex gap-2">
				<NumberInput
					defaultValue={agentsAmount}
					max={999999}
					min={3}
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
				<Button
					colorScheme="blue"
					onClick={() => setSimulationResult(runSimulation(agentsAmount, modelChoice))}
					size="lg"
				>
					Run Simulation
				</Button>
			</div>
		</main>
	);
}
