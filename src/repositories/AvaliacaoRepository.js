const Avaliacao = require('../models/Avaliacao');

class AvaliacaoRepository {
    async criar(dados) {
        return Avaliacao.create(dados);
    }

    async listarAprovadas(pontoTuristico) {
        const lista = await Avaliacao.find({
            pontoTuristico,
            aprovado: true
        })
            .sort({ createdAt: -1 })
            .select('-__v');

        const resultadoMedia = await Avaliacao.aggregate([
            {
                $match: {
                    pontoTuristico: lista.length > 0
                        ? lista[0].pontoTuristico
                        : pontoTuristico,
                    aprovado: true
                }
            },
            {
                $group: {
                    _id: null,
                    media: {
                        $avg: '$nota'
                    }
                }
            }
        ]);

        const media = resultadoMedia.length > 0
            ? Number(resultadoMedia[0].media.toFixed(1))
            : 0;

        return {
            lista,
            media
        };
    }

    async listarPendentes() {
        return Avaliacao.find({
            aprovado: false
        })
            .sort({ createdAt: 1 })
            .populate('pontoTuristico', 'nome')
            .select('-__v');
    }

    async aprovar(id) {
        return Avaliacao.findOneAndUpdate(
            {
                _id: id,
                aprovado: false
            },
            {
                aprovado: true
            },
            {
                new: true
            }
        ).select('-__v');
    }
}

module.exports = new AvaliacaoRepository();