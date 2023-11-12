type Agent = {
	id: number;
	opinion: 'A' | 'B' | 'undecided';
};

export type Model = 'three-majority' | 'two-choices' | 'undecided-state-dynamics';

export type SimulationResult = {
	history: HistoryItem[];
	message: string;
};

export type HistoryItem = {
	A: number;
	B: number;
	iteration: number;
	undecided?: number;
};

const createAgents = (n: number) => {
	const agents: Agent[] = [];
	for (let i = 0; i < n; i++) {
		const opinion: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
		agents.push({ id: i, opinion });
	}
	return agents;
};

const countOpinions = (agents: Agent[]) => {
	let A = 0;
	let B = 0;
	agents.forEach((agent) => {
		if (agent.opinion === 'A') {
			A++;
		} else {
			B++;
		}
	});
	return { A, B };
};

const pickUniqueRandomAgents = (agents: Agent[], amount: number) => {
	const selectedAgents: Agent[] = [];
	for (let i = 0; i < amount; i++) {
		let randomIndex = Math.floor(Math.random() * agents.length);
		while (selectedAgents.includes(agents[randomIndex])) {
			randomIndex = Math.floor(Math.random() * agents.length);
		}
		selectedAgents.push(agents[randomIndex]);
	}
	return selectedAgents;
};

export const runSimulation = (n: number, model: Model): SimulationResult => {
	if (n < 4) {
		return { history: [], message: 'n must be greater or equal to 4' };
	}
	const agents = createAgents(n);
	let { A, B } = countOpinions(agents);
	let undecided = 0;

	console.log(
		'Running simulation with n = ' + n + ' and model = ' + model + '. A: ' + A + ' B: ' + B,
	);

	const checkAndChangeOpinion = (selectedAgent: Agent, compareAgent: Agent) => {
		if (selectedAgent.opinion !== compareAgent.opinion) {
			if (selectedAgent.opinion === 'A') {
				A--;
				B++;
			} else {
				A++;
				B--;
			}
			agents[selectedAgent.id].opinion = compareAgent.opinion;
		}
	};

	const mod = Math.pow(10, Math.floor(Math.log10(Math.ceil(n / 20))));

	const history: HistoryItem[] = [];
	let iterations = 0;
	history.push({ A, B, iteration: 0 });

	if (model === 'two-choices') {
		while (A !== n && B !== n) {
			const selectedAgents = pickUniqueRandomAgents(agents, 3);
			if (selectedAgents[1].opinion === selectedAgents[2].opinion) {
				checkAndChangeOpinion(selectedAgents[0], selectedAgents[1]);
			}
			iterations++;
			if (n < 200 || iterations % mod === 0) {
				history.push({ A, B, iteration: history.length * mod });
			}
		}
	} else if (model === 'three-majority') {
		while (A !== n && B !== n) {
			const selectedAgents = pickUniqueRandomAgents(agents, 4);
			if (selectedAgents[1].opinion === selectedAgents[2].opinion) {
				checkAndChangeOpinion(selectedAgents[0], selectedAgents[1]);
			} else if (selectedAgents[1].opinion === selectedAgents[3].opinion) {
				checkAndChangeOpinion(selectedAgents[0], selectedAgents[1]);
			} else {
				checkAndChangeOpinion(selectedAgents[0], selectedAgents[2]);
			}
			iterations++;
			if (n < 200 || iterations % mod === 0) {
				history.push({ A, B, iteration: history.length * mod });
			}
		}
	} else if (model === 'undecided-state-dynamics') {
		while (A !== n && B !== n) {
			const selectedAgents = pickUniqueRandomAgents(agents, 2);
			if (selectedAgents[0].opinion === 'undecided') {
				if (selectedAgents[1].opinion !== 'undecided') {
					agents[selectedAgents[0].id].opinion = selectedAgents[1].opinion;
					selectedAgents[1].opinion === 'A' ? A++ : B++;
					undecided--;
				}
			} else if (
				selectedAgents[1].opinion !== 'undecided' &&
				selectedAgents[0].opinion !== selectedAgents[1].opinion
			) {
				selectedAgents[0].opinion === 'A' ? A-- : B--;
				agents[selectedAgents[0].id].opinion = 'undecided';
				undecided++;
			}
			iterations++;
			if (n < 200 || iterations % mod === 0) {
				history.push({ A, B, iteration: history.length * mod, undecided });
			}
		}
	}

	if (iterations === 0) {
		history.push({ A, B, iteration: history.length * mod });
	}

	return {
		history,
		message: 'Winner is ' + (A === 0 ? 'B' : 'A'),
	};
};
