const TrilhaDTO = require('../dto/TrilhaDTO');
const repository = require('../repositories/TrilhaRepository');

class TrilhaController {
    async criar(req, res) {
        try {
            const dto = new TrilhaDTO(req.body);

            const erros = dto.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const trilhaExistente = await repository.buscarPorPonto(
                dto.pontoTuristico
            );

            if (trilhaExistente) {
                return res.status(409).json({
                    mensagem: 'Já existe uma trilha para este ponto turístico'
                });
            }

            const trilha = await repository.criar(dto);

            return res.status(201).json(trilha);
        } catch (erro) {
            console.error('Erro ao criar trilha:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível criar a trilha'
            });
        }
    }

    async buscarPorPonto(req, res) {
        try {
            const { pontoId } = req.params;

            const trilha = await repository.buscarPorPonto(pontoId);

            if (!trilha) {
                return res.status(404).json({
                    mensagem: 'Trilha não encontrada'
                });
            }

            return res.status(200).json(trilha);
        } catch (erro) {
            console.error('Erro ao buscar trilha:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível buscar a trilha'
            });
        }
    }
}

module.exports = new TrilhaController();