const express = require('express');

const controller = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/cadastrar', (req, res) => {
    controller.cadastrar(req, res);
});

router.post('/login', (req, res) => {
    controller.login(req, res);
});

module.exports = router;