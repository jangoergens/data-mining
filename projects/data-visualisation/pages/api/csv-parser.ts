import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';

export type Data = {
	[key: string]: number | string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const fileName = req.query.fileName as string;
	try {
		const csv = fs.readFileSync(process.cwd() + '/data/' + fileName, 'utf-8');
		const rows = csv.split('\n');
		const columnNames = rows[0].trim().split(',');
		const data: Data[] = [];
		for (let i = 1; i < rows.length; i++) {
			const columnValues = rows[i].trim().split(',');
			const rowData: Data = {};
			for (let j = 0; j < columnNames.length; j++) {
				rowData[columnNames[j]] = columnValues[j];
			}
			data.push(rowData);
		}

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Error reading CSV file' });
	}
}
