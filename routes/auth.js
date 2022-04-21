const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, googleSignIn, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/', [
    check('password', 'Password es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('email', 'Formato de Email incorrecto').isEmail(),
    validarCampos
    ], 
    login
);

router.post('/google', [
    check('token', 'Token es obligatorio').not().isEmpty(),
    validarCampos
    ], 
    googleSignIn
);

router.get('/renew',
    validarJWT, 
    renewToken
);

module.exports = router;