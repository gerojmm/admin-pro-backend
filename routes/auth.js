const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/', [
    check('password', 'Password es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('email', 'Formato de Email incorrecto').isEmail(),
    validarCampos
    ], 
    login
);

module.exports = router;