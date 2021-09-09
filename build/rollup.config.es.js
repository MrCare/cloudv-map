import base from './rollup.config.base.js';

const config = {
    ...base,
    output: {
        name: 'index',
        file: 'lib/index.esm.js',
        format: 'es',
    },
};

export default config;
