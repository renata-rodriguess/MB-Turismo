const Usuario = require('../models/Usuario');

class UsuarioRepository {
    async criar(dados) {
        return Usuario.create(dados);
    }

    async buscarPorNome(nomeUsuario) {
        return Usuario.findOne({
            nomeUsuario: nomeUsuario.trim()
        }).select('+senha');
    }
}

module.exports = new UsuarioRepository();