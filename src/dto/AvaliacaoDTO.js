class AvaliacaoDTO {
    constructor(data) {
        data = data || {};

        this.comentario = (data.comentario || '').trim();
        this.nota = Number(data.nota);
        this.pontoTuristico = data.pontoTuristico;
    }

    validar() {
        const erros = [];

        if (!this.comentario) {
            erros.push('Comentário é obrigatório');
        }

        if (this.comentario.length > 500) {
            erros.push('Comentário deve ter no máximo 500 caracteres');
        }

        if (!Number.isInteger(this.nota) || this.nota < 1 || this.nota > 5) {
            erros.push('Nota deve ser um número inteiro entre 1 e 5');
        }

        if (!this.pontoTuristico) {
            erros.push('Ponto turístico é obrigatório');
        }

        return erros;
    }
}

module.exports = AvaliacaoDTO;