import { uglify } from 'rollup-plugin-uglify';
import base from './rollup.config.base.js';

const config = {
    ...base,
    output: {
        name: 'index',
        file: 'lib/index.umd.js',
        format: 'umd',
    },
};

config.plugins.push(uglify());

export default config;
