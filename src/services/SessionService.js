const connection = require('../database/connection');

module.exports = {
    async create(request, response) {

        const { id } = request.body;

        if (!id)
            return response.status(400).json({ mensagem: "Id da ONG é obrigatório!" })

        const ong = await connection('ongs')
            .where('id', id)
            .select('nome')
            .first();

        if (!ong)
            return response.status(404).json({ mensagem: "Nenhuma ONG com esse id foi encontrada!" })

        return response.json(ong);
    }
}