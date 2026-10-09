const Trilha = require('../models/Trilha');

class TrilhaRepository {
    async criar(dados) {
        return Trilha.create(dados);
    }

    async buscarPorPonto(pontoTuristico) {
        return Trilha.findOne({
            pontoTuristico,
            ativo: true
        }).populate('pontoTuristico', 'nome');
    }
}

module.exports = new TrilhaRepository();