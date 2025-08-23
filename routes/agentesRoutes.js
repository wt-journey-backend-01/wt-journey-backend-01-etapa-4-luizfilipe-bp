const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const validateIDParam = require('../utils/validateIDParam');
const { validateSchema } = require('../utils/validateSchema');
const { postAgenteSchema, putAgenteSchema, patchAgenteSchema } = require('../utils/agentesSchema');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/:id/casos', authenticateToken, validateIDParam, agentesController.getCasosByAgente);
router.get('/', authenticateToken, agentesController.getAllAgentes);
router.get('/:id', authenticateToken, validateIDParam, agentesController.getAgenteById);
router.post('/', authenticateToken, validateSchema(postAgenteSchema), agentesController.postAgente);
router.put('/:id', authenticateToken, validateIDParam, validateSchema(putAgenteSchema), agentesController.putAgente);
router.patch(
    '/:id',
    authenticateToken,
    validateIDParam,
    validateSchema(patchAgenteSchema),
    agentesController.patchAgente
);
router.delete('/:id', authenticateToken, validateIDParam, agentesController.deleteAgente);

module.exports = router;
