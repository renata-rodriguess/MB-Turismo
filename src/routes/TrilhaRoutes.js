const express = require('express');

const controller = require('../controllers/TrilhaController');

const router = express.Router();

router.post('/', (req, res) => {
    controller.criar(req, res);
});

router.get('/ponto/:pontoId', (req, res) => {
    controller.buscarPorPonto(req, res);
});

module.exports = router;