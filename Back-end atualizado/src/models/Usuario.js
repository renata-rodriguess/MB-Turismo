const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
    {
        nomeUsuario: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        senha: {
            type: String,
            required: true,
            select: false
        },
        perfil: {
            type: String,
            enum: ['usuario', 'admin'],
            default: 'usuario',
            required: true
        },
        ativo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

usuarioSchema.pre('save', async function () {
    if (!this.isModified('senha')) {
        return;
    }

    this.senha = await bcrypt.hash(this.senha, 10);
});

usuarioSchema.methods.compararSenha = async function (senhaInformada) {
    return bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);