const mongoose = require('mongoose');

const pontoTuristicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        unique: true
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
        trim: true
    },
    categoria: {
        type: String,
        enum: ['cachoeira', 'mirante', 'Outro'],
        default: 'Outro'
    },
    imagem: {
        type: String,
        default: ''
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
module.exports = mongoose.model('PontoTuristico', pontoTuristicoSchema);
