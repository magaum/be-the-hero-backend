const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async create(request, response) {
        const { nome, email, whatsapp, cidade, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf
        });

        return response.json({ id });
    },

    async getAll(request, response) {
        let ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async getByOng(request, response) {

        const { id } = request.params;

        const casos = await connection('casos')
            .where('ong_id', id)
            .select('*');

        return response.json(casos);
    }

} 