const express = require('express');
const controller = require('../controllers/PontoTuristicoController');

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.buscar);
router.patch('/:id', controller.atualizar);
router.get('/:id', controller.detalhes);

module.exports = router;