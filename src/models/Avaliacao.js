const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema(
    {
        nomeUsuario: {
            type: String,
            required: true,
            trim: true
        },
        comentario: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
        nota: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        pontoTuristico: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PontoTuristico',
            required: true
        },
        aprovado: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

avaliacaoSchema.index({
    pontoTuristico: 1,
    aprovado: 1,
    createdAt: -1
});

module.exports = mongoose.model('Avaliacao', avaliacaoSchema);