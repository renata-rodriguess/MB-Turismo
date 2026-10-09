const AvaliacaoDTO = require('../dto/AvaliacaoDTO');
const repository = require('../repositories/AvaliacaoRepository');

class AvaliacaoController {
    async enviar(req, res) {
        try {
            const dto = new AvaliacaoDTO(req.body);

            const erros = dto.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            if (!req.usuario) {
                return res.status(401).json({
                    mensagem: 'Autenticação necessária'
                });
            }

            const dadosAvaliacao = {
                nomeUsuario: req.usuario.nomeUsuario,
                comentario: dto.comentario,
                nota: dto.nota,
                pontoTuristico: dto.pontoTuristico
            };

            const avaliacao = await repository.criar(dadosAvaliacao);

            return res.status(201).json({
                mensagem: 'Avaliação enviada com sucesso',
                avaliacao
            });
        } catch (erro) {
            console.error('Erro ao enviar avaliação:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível enviar a avaliação'
            });
        }
    }

    async listarAprovadas(req, res) {
        try {
            const { pontoId } = req.params;

            const resultado = await repository.listarAprovadas(pontoId);

            return res.status(200).json(resultado);
        } catch (erro) {
            console.error('Erro ao listar avaliações:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível buscar as avaliações'
            });
        }
    }

    async listarPendentes(req, res) {
        try {
            const avaliacoes = await repository.listarPendentes();

            return res.status(200).json(avaliacoes);
        } catch (erro) {
            console.error('Erro ao listar avaliações pendentes:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível buscar as avaliações pendentes'
            });
        }
    }

    async aprovar(req, res) {
        try {
            const { id } = req.params;

            const avaliacao = await repository.aprovar(id);

            if (!avaliacao) {
                return res.status(404).json({
                    mensagem: 'Avaliação não encontrada'
                });
            }

            return res.status(200).json({
                mensagem: 'Avaliação aprovada com sucesso',
                avaliacao
            });
        } catch (erro) {
            console.error('Erro ao aprovar avaliação:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível aprovar a avaliação'
            });
        }
    }
}

module.exports = new AvaliacaoController();