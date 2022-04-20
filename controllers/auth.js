const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

const login = async(req, res) => {
    try {

        const { email, password } = req.body;

        const existeEmail = await Usuario.findOne({ email });

        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, existeEmail.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        const token = await generateJWT(existeEmail.uid);

        res.status(200).json({
            ok: true,
            msg: token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }
}

const googleSignIn = async (req, res) => {

    
    const googleToken = req.body.token;
    
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        console.log(':::data', { name, email, picture });
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: 'xxx',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.googe = true;
        }

        await usuario.save();
        const token = await generateJWT(usuarioDB.uid);

        res.status(200).json({
            ok: true,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}