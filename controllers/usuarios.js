const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    
    const usuarios = await Usuario.find();
    res.json({
        ok: true,
        usuarios
    });
}

const createUsuarios = async (req, res) => {

    const { name, password, email} = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            });
        }
        
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar token
        const token = await generateJWT(usuario.uid);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }
} 

const updateUsuario = async( req, res ) => {
    const uid = req.params.uid;
    
    try {
        const existeUsuario = await Usuario.findById(uid);

        if (!existeUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        const { password, google, email, ...campos } = req.body;

        campos.email = email;

        if (existeUsuario.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Correo ya registrado'
                });
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true});
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }
}

const deleteUsuario = async( req, res ) => {
    const uid = req.params.uid;

    try {
        const existeUsuario = await Usuario.findById(uid);

        if (!existeUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuarios,
    updateUsuario,
    deleteUsuario
}