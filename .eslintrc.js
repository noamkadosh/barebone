module.exports = {
	env: {
		node: true,
		es2021: true
	},
	extends: [
		'xo',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'prettier'
	],
	rules: {
		indent: ['error', 'tab'],
		'object-curly-spacing': ['error', 'always'],
		'capitalized-comments': ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'new-cap': ['error', {
			capIsNewExceptions: ['Router']
		}],
		'no-unused-vars': ['error', {
			argsIgnorePattern: 'res|req|next',
			args: 'none'
		}],
		'spaced-comment': [2, 'always', {
			'exceptions': ['#']
		}]
	},
	'overrides': [
		{
			'files': ['*.graphql'],
			'parser': '@graphql-eslint/eslint-plugin',
			'plugins': ['@graphql-eslint']
		}
	]
};
