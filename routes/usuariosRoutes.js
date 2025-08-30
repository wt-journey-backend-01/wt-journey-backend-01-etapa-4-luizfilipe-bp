const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/me', authenticateToken, usuariosController.getMe);
router.delete('/:id', authenticateToken, usuariosController.deleteUsuario);

module.exports = router;
