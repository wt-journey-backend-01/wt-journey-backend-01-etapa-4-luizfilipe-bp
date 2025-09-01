const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSchema } = require('../utils/validateSchema');
const { registerUsuarioSchema, loginUsuarioSchema } = require('../utils/usuariosSchema');

router.post('/register', validateSchema(registerUsuarioSchema), authController.register);
router.post('/login', validateSchema(loginUsuarioSchema), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
