const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    try {
        const autorizacao = req.headers.authorization;

        if (!autorizacao) {
            return res.status(401).json({
                mensagem: 'Autenticação necessária'
            });
        }

        const partes = autorizacao.split(' ');

        if (partes.length !== 2 || partes[0] !== 'Bearer') {
            return res.status(401).json({
                mensagem: 'Token de autenticação inválido'
            });
        }

        const token = partes[1];

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = {
            id: payload.sub,
            nomeUsuario: payload.nomeUsuario,
            perfil: payload.perfil
        };

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Sessão inválida ou expirada'
        });
    }
}

module.exports = autenticar;