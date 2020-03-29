const express = require('express');
const serviceOng = require('./services/OngService');
const serviceCaso = require('./services/CasoService');
const serviceSession = require('./services/SessionService');
const routes = express.Router();

routes.post('/ongs', serviceOng.create);
routes.get('/ongs', serviceOng.getAll);
routes.get('/ongs/:id/casos', serviceOng.getByOng);

routes.get('/', (request, response) => {
    return response.status(200);
});

routes.post('/casos', serviceCaso.create);
routes.get('/casos', serviceCaso.getAll);
routes.delete('/casos/:id', serviceCaso.delete);

routes.post('/session', serviceSession.create);

module.exports = routes;