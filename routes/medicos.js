const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, createMedicos, updateMedicos, deleteMedicos, getMedicoById } = require('../controllers/medicos');


const router = Router();

router.get('/',
getMedicos);

router.post('/', 
[
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('hospital', 'Id Inválido').isMongoId(),
    validarCampos
], 
createMedicos);

router.put('/:uid', 
[
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('hospital', 'Id Inválido').isMongoId(),
    validarCampos
], 
updateMedicos);

router.delete('/:uid', 
    validarJWT,
    deleteMedicos);

router.get('/:uid', 
    validarJWT,
    getMedicoById);

module.exports = router;