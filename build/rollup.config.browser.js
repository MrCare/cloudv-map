import { uglify } from 'rollup-plugin-uglify';
import base from './rollup.config.base.js';

const config = {
    ...base,
    output: {
        exports: 'named',
        name: 'index',
        file: 'lib/index.min.js',
        format: 'iife',
    },
};

config.plugins.push(uglify());

export default config;
