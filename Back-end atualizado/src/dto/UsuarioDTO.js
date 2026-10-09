class UsuarioDTO {
    constructor(data) {
        data = data || {};

        this.nomeUsuario = (data.nomeUsuario || '').trim();
        this.senha = (data.senha || '').trim();
    }

    validarCadastro() {
        const erros = [];

        if (!this.nomeUsuario || this.nomeUsuario.length < 3) {
            erros.push('Nome de usuário: mínimo 3 caracteres');
        }

        if (!this.senha || this.senha.length < 6) {
            erros.push('Senha: mínimo 6 caracteres');
        }

        return erros;
    }

    validarLogin() {
        const erros = [];

        if (!this.nomeUsuario) {
            erros.push('Digite seu usuário');
        }

        if (!this.senha) {
            erros.push('Digite sua senha');
        }

        return erros;
    }
}

module.exports = UsuarioDTO;