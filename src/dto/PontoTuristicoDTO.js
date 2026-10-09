class PontoTuristicoDTO {
    constructor(data) {
        data = data || {};

        this.nome = (data.nome || '').trim();
        this.descricao = (data.descricao || '').trim();
        this.categoria = (data.categoria || '').trim();
        this.imagem = (data.imagem || '').trim();
    }

    validar() {
        const erros = [];

        if (!this.nome) {
            erros.push('Nome do ponto turístico é obrigatório');
        }

        if (!this.descricao) {
            erros.push('Descrição do ponto turístico é obrigatória');
        }

        if (!this.categoria) {
            erros.push('Categoria é obrigatória');
        }

        if (!['cachoeira', 'mirante', 'Outro'].includes(this.categoria)) {
            erros.push('Categoria inválida');
        }

        return erros;
    }
}

module.exports = PontoTuristicoDTO;