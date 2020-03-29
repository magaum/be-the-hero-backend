const knex = require('knex');
const configuration = require('../../knexfile');

let env = undefined;
switch (process.env.NODE_ENV) {
    case ('staging'):
        env = configuration.staging;
    case ('production'):
        env = configuration.production;
    default:
        env = configuration.development;

}
console.log({ 'Enviroment': env });

const connection = knex(env);

module.exports = connection;