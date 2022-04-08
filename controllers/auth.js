const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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

module.exports = {
    login
}