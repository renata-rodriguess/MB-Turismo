const mongoose = require('mongoose');

const passoSchema = new mongoose.Schema(
    {
        ordem: {
            type: Number,
            required: true,
            min: 1
        },
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        descricao: {
            type: String,
            required: true,
            trim: true
        },
        direcao: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        _id: false
    }
);

const trilhaSchema = new mongoose.Schema(
    {
        pontoTuristico: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PontoTuristico',
            required: true,
            unique: true
        },
        nome: {
            type: String,
            required: true,
            trim: true
        },
        descricao: {
            type: String,
            required: true,
            trim: true
        },
        dificuldade: {
            type: String,
            enum: ['Fácil', 'Médio', 'Difícil'],
            required: true
        },
        passos: {
            type: [passoSchema],
            default: []
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

trilhaSchema.index({
    pontoTuristico: 1,
    ativo: 1
});

module.exports = mongoose.model('Trilha', trilhaSchema);