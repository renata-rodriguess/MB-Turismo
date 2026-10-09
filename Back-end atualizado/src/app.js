require('dotenv').config();

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');

const usuarioRoutes = require('./routes/UsuarioRoutes');
const pontoRoutes = require('./routes/PontoTuristicoRoutes');
const trilhaRoutes = require('./routes/TrilhaRoutes');
const avaliacaoRoutes = require('./routes/AvaliacaoRoutes');

const app = express();

app.disable('x-powered-by');

const frontendUrl =
    process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
    cors({
        origin: frontendUrl,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(
    express.json({
        limit: '100kb'
    })
);

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pontos', pontoRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        mensagem: 'MB Turismo API funcionando!'
    });
});

app.use(errorHandler);

module.exports = app;