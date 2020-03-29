const express = require('express');
const serviceOng = require('./services/OngService');
const serviceCaso = require('./services/CasoService');
const serviceSession = require('./services/SessionService');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), serviceOng.create);
routes.get('/ongs', serviceOng.getAll);
routes.get('/ongs/:id/casos', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), serviceOng.getByOng);

routes.get('/', (request, response) => {
    return response.status(200);
});

routes.post('/casos', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required().max(255),
        valor: Joi.number()
    })
}), serviceCaso.create);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1)
    })
}), serviceCaso.getAll);

routes.delete('/casos/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), serviceCaso.delete);

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.string().required()
    })
}), serviceSession.create);

module.exports = routes;