import type { Metadata } from 'next';

import Header from '@/components/Header';
import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	description: 'Data Visualization App',
	title: 'Data Mining',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className="flex min-h-screen flex-col items-center gap-4 px-4 py-4 md:px-24">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
