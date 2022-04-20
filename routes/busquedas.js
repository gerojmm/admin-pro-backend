const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getAll, getDocumentoColeccion } = require('../controllers/busquedas');


const router = Router();

router.get('/:busqueda',
validarJWT,
getAll); 

router.get('/coleccion/:tabla/:busqueda',
validarJWT,
getDocumentoColeccion); 



module.exports = router;