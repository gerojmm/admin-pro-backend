const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, createMedicos, updateMedicos, deleteMedicos } = require('../controllers/medicos');


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
[], 
updateMedicos);

router.delete('/:uid', 
deleteMedicos);

module.exports = router;