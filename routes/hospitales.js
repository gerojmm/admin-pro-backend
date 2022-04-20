const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, createHospitales, updateHospitales, deleteHospitales } = require('../controllers/hospitales');


const router = Router();

router.get('/',
getHospitales); 

router.post('/', 
[
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    validarCampos
], 
createHospitales);

router.put('/:uid', 
[], 
updateHospitales);

router.delete('/:uid', 
deleteHospitales);

module.exports = router;