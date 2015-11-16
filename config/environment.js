/* eslint-disable */

import dotenv   from 'dotenv';

// create a empty object 
let config = {};

// load the environment
dotenv.load();

// Environment variabels

config.env = process.env.NODE_ENV;
config.globals = {

  'process.env'  : {
    'NODE_ENV' : config.env
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
	
	};

export default config;

/* eslint-enable */