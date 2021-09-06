module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
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
};
