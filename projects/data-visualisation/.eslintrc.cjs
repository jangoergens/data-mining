module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:perfectionist/recommended-natural',
		'next/core-web-vitals',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		project: true,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'perfectionist'],
	root: true,
};
