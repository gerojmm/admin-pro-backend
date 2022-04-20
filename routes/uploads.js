const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');

const { fileUpload, returnImage } = require('../controllers/uploads');


const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload); 
router.get('/:tipo/:image', returnImage); 


module.exports = router;