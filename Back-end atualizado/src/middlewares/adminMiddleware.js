function exigirAdmin(req, res, next) {
    if (!req.usuario) {
        return res.status(401).json({
            mensagem: 'Autenticação necessária'
        });
    }

    if (req.usuario.perfil !== 'admin') {
        return res.status(403).json({
            mensagem: 'Acesso permitido somente para administradores'
        });
    }

    next();
}

module.exports = exigirAdmin;