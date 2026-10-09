const express = require('express');

const controller = require('../controllers/AvaliacaoController');
const autenticar = require('../middlewares/authMiddleware');
const exigirAdmin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/', autenticar, (req, res) => {
    controller.enviar(req, res);
});

router.get('/ponto/:pontoId', (req, res) => {
    controller.listarAprovadas(req, res);
});

router.get('/pendentes', autenticar, exigirAdmin, (req, res) => {
    controller.listarPendentes(req, res);
});

router.patch('/:id/aprovar', autenticar, exigirAdmin, (req, res) => {
    controller.aprovar(req, res);
});

module.exports = router;