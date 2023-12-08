'use client';

import { HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function WithSubnavigation() {
	return (
		<header>
			<nav>
				<HStack justify={'center'}>
					{[
						{ name: 'Home', path: '' },
						{ name: 'Sheet 3', path: 'sheet03' },
						{ name: 'Sheet 4', path: 'sheet04' },
						{ name: 'Sheet 5', path: 'sheet05' },
						{ name: 'Sheet 6', path: 'sheet06' },
					].map(({ name, path }) => (
						<Link as={NextLink} href={'/' + path} key={path} px={[2, null, 16]} py={4}>
							{name}
						</Link>
					))}
				</HStack>
			</nav>
		</header>
	);
}
