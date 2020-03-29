const knex = require('knex');
const configuration = require('../../knexfile');

let env = undefined;
switch (process.env.NODE_ENV) {
    case ('test'):
        env = configuration.test;
        break;
    case ('staging'):
        env = configuration.staging;
        break;
    case ('production'):
        env = configuration.production;
        break;
    default:
        env = configuration.development;
        break;

}
console.log({ 'Enviroment': process.env.NODE_ENV });

const connection = knex(env);

module.exports = connection;