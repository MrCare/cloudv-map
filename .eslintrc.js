module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-iterator': 0,
        'no-restricted-syntax': 1,
        indent: ['error', 4],
        'import/extensions': ['error', 'ignorePackages', {
            js: 'always',
            mjs: 'never',
            jsx: 'never',
        }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
