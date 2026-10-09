const PontoTuristicoDTO = require('../dto/PontoTuristicoDTO');
const repository = require('../repositories/PontoTuristicoRepository');

class PontoTuristicoController {
    async criar(req, res) {
        try {
            const dto = new PontoTuristicoDTO(req.body);

            const erros = dto.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const ponto = await repository.criar(dto);

            return res.status(201).json(ponto);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno'
            });
        }
    }

    async buscar(req, res) {
        try {
            const { nome } = req.query;

            const pontos = nome
                ? await repository.buscarporNome(nome)
                : await repository.listarTodos();

            return res.status(200).json(pontos);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno'
            });
        }
    }

    async detalhes(req, res) {
        try {
            const ponto = await repository.buscarPorId(req.params.id);

            if (!ponto) {
                return res.status(404).json({
                    mensagem: 'Ponto não encontrado'
                });
            }

            return res.status(200).json(ponto);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno'
            });
        }
    }

    async atualizar(req, res) {
        try {
            const dados = {};

            if (req.body.nome !== undefined) {
                dados.nome = req.body.nome.trim();
            }

            if (req.body.descricao !== undefined) {
                dados.descricao = req.body.descricao.trim();
            }

            if (req.body.categoria !== undefined) {
                dados.categoria = req.body.categoria;
            }

            if (req.body.imagem !== undefined) {
                dados.imagem = req.body.imagem.trim();
            }

            const ponto = await repository.atualizar(
                req.params.id,
                dados
            );

            if (!ponto) {
                return res.status(404).json({
                    mensagem: 'Ponto não encontrado'
                });
            }

            return res.status(200).json(ponto);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno'
            });
        }
    }
}

module.exports = new PontoTuristicoController();