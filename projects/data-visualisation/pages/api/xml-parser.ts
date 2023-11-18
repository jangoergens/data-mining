import type { NextApiRequest, NextApiResponse } from 'next';

import { Data } from '@/app/sheet04/page';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const xml = fs.readFileSync(
			process.cwd() + '/data/sheet04/1/primary_education_numbers.xml',
			'utf-8',
		);

		const parser = new XMLParser();
		type JSONData = {
			ROOT: {
				data: {
					record: Data[];
				};
			};
		};
		const jsonObject = parser.parse(xml) as JSONData;

		res.status(200).json(jsonObject.ROOT.data.record);
	} catch (error) {
		res.status(500).json({ error: 'Error reading XML file' });
	}
}
