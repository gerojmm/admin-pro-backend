const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarSameUser } = require('../middlewares/validar-jwt');


const { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

const router = Router();
    

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    check('email', 'Formato de Email incorrecto').isEmail(),
    validarCampos
], 
createUsuarios);

router.put('/:uid', [
    validarJWT,
    validarSameUser,
    check('nombre', 'Nombre es obligatorio').not().isEmpty()
], updateUsuario);

router.delete('/:uid', validarJWT, deleteUsuario);

module.exports = router;