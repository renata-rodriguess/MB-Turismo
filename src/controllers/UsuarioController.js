const jwt = require('jsonwebtoken');

const UsuarioDTO = require('../dto/UsuarioDTO');
const repository = require('../repositories/UsuarioRepository');

class UsuarioController {
    async cadastrar(req, res) {
        try {
            const dto = new UsuarioDTO(req.body);

            const erros = dto.validarCadastro();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const existe = await repository.buscarPorNome(dto.nomeUsuario);

            if (existe) {
                return res.status(409).json({
                    mensagem: 'Não foi possível realizar o cadastro'
                });
            }

            const usuario = await repository.criar({
                nomeUsuario: dto.nomeUsuario,
                senha: dto.senha
            });

            return res.status(201).json({
                mensagem: 'Cadastro realizado com sucesso',
                usuario: {
                    id: usuario._id,
                    nomeUsuario: usuario.nomeUsuario,
                    perfil: usuario.perfil
                }
            });
        } catch (erro) {
            console.error('Erro ao cadastrar usuário:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível realizar o cadastro'
            });
        }
    }

    async login(req, res) {
        try {
            const dto = new UsuarioDTO(req.body);

            const erros = dto.validarLogin();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const usuario = await repository.buscarPorNome(dto.nomeUsuario);

            if (!usuario || usuario.ativo === false) {
                return res.status(401).json({
                    mensagem: 'Usuário ou senha incorretos'
                });
            }

            const senhaCorreta = await usuario.compararSenha(dto.senha);

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: 'Usuário ou senha incorretos'
                });
            }

            const token = jwt.sign(
                {
                    sub: usuario._id.toString(),
                    nomeUsuario: usuario.nomeUsuario,
                    perfil: usuario.perfil
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso',
                token,
                usuario: {
                    id: usuario._id,
                    nomeUsuario: usuario.nomeUsuario,
                    perfil: usuario.perfil
                }
            });
        } catch (erro) {
            console.error('Erro ao realizar login:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível realizar o login'
            });
        }
    }
}

module.exports = new UsuarioController();