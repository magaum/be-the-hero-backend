const connection = require('../database/connection');

module.exports = {
    async create(request, response) {

        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        await connection('casos')
            .insert({
                titulo,
                descricao,
                valor,
                ong_id
            })
            .returning('id')
            .then(([id]) => {
                return response.json({ id });
            })
            .catch(err => {
                response.status(500).json({ mensagem: err.message || 'Erro ao cadastrar caso' });
            });
    },

    async getAll(request, response) {
        const { page = 1 } = request.query;
        const items = 5;

        const [count] = await connection('casos')
            .count();

        response.header('X-Total-Count', count["count"]);

        const casos = await connection('casos')
            .join("ongs", "ongs.id", "=", "casos.ong_id")
            .limit(items)
            .offset((page - 1) * items)
            .select([
                'casos.*',
                'ongs.email',
                'ongs.nome',
                'ongs.cidade',
                'ongs.uf',
                'ongs.whatsapp'
            ]);

        return response.json(casos);
    },

    async delete(request, response) {

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('casos')
            .where('id', id)
            .select('ong_id')
            .first();
        if (caso.ong_id !== ong_id)
            return response.status(403).json({ mesagem: "Operação não permitida!" })

        await connection('casos').where('id', id).delete();

        return response.status(204).send();
    }
}