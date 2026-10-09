const errorHandler = (err, req, res, next) => {
    console.log('>>>> ERRO DETALHADO:', err)
    console.error('Erro:', err.message);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            mensagem: 'Dados inválidos',
            erros:
                Object.values(err.errors).map(e => e.message)
        });
    }
    if (err.code === 11000) {
        return res.status(409).json({
            mensagem: 'Já existe um registro com esse nome'
        });
    }
    return res.status(500).json({
        mensagem: 'Erro interno do servidor'
    });
};
module.exports = errorHandler;
