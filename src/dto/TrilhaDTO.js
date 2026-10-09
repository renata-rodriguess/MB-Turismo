class TrilhaDTO {
    constructor(data) {
        data = data || {};

        this.pontoTuristico = data.pontoTuristico;
        this.nome = (data.nome || '').trim();
        this.descricao = (data.descricao || '').trim();
        this.dificuldade = (data.dificuldade || '').trim();
        this.passos = Array.isArray(data.passos) ? data.passos : [];
    }

    validar() {
        const erros = [];

        if (!this.pontoTuristico) {
            erros.push('Ponto turístico é obrigatório');
        }

        if (!this.nome) {
            erros.push('Nome da trilha é obrigatório');
        }

        if (!this.descricao) {
            erros.push('Descrição da trilha é obrigatória');
        }

        if (!this.dificuldade) {
            erros.push('Dificuldade da trilha é obrigatória');
        }

        if (!['Fácil', 'Médio', 'Difícil'].includes(this.dificuldade)) {
            erros.push('Dificuldade inválida');
        }

        return erros;
    }
}

module.exports = TrilhaDTO;