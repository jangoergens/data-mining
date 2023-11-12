type Agent = {
	id: number;
	opinion: 'A' | 'B';
};

export type Model = 'three-majority' | 'two-choices' | 'undecided state dynamics';

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

export const runSimulation = (n: number, model: Model) => {
	if (n < 3) {
		return 'n must be greater or equal to 3';
	}
	console.log('Running simulation with n = ' + n + ' and model = ' + model);
	const agents = createAgents(n);
	let { A, B } = countOpinions(agents);
	console.log('A: ' + A + ' B: ' + B);
	if (model === 'two-choices') {
		while (A !== 0 && B !== 0) {
			const selectedAgents = pickUniqueRandomAgents(agents, 3);
			if (selectedAgents[1].opinion === selectedAgents[2].opinion) {
				if (selectedAgents[0].opinion !== selectedAgents[1].opinion) {
					if (selectedAgents[0].opinion === 'A') {
						A--;
						B++;
					} else {
						A++;
						B--;
					}
					agents[selectedAgents[0].id].opinion = selectedAgents[1].opinion;
				}
			}
		}
	} else if (model === 'three-majority') {
		//TODO
	} else {
		//TODO
	}
	console.log('Winner is ' + (A === 0 ? 'B' : 'A'));

	return 'Winner is ' + (A === 0 ? 'B' : 'A');
};
