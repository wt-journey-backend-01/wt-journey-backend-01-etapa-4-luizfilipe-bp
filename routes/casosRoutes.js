const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateIDParam = require('../utils/validateIDParam');
const { validateSchema } = require('../utils/validateSchema');
const { postCasoSchema, putCasoSchema, patchCasoSchema } = require('../utils/casosSchema');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/search', authenticateToken, casosController.searchCasos);
router.get('/:id/agente', authenticateToken, validateIDParam, casosController.getAgenteByCaso);
router.get('/', authenticateToken, casosController.getAllCasos);
router.get('/:id', authenticateToken, validateIDParam, casosController.getCasoById);
router.post('/', authenticateToken, validateSchema(postCasoSchema), casosController.postCaso);
router.put(
    '/:id',
    authenticateToken,
    validateIDParam,
    validateSchema(putCasoSchema),
    casosController.updateCaso
);
router.patch(
    '/:id',
    authenticateToken,
    validateIDParam,
    validateSchema(patchCasoSchema),
    casosController.patchCaso
);
router.delete('/:id', authenticateToken, validateIDParam, casosController.deleteCaso);

module.exports = router;
