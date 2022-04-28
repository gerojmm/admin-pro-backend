const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    
}

const validarAdminRole = async (req, res, next) => {
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privelegios para modificar datos'
            });
        }

        next();


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Role no corresponde'
        });
    }
}

const validarSameUser = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        console.log(':::', uid, id);
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {

            return res.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privelegios para modificar datos'
            });
        }
        


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Role no corresponde'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarSameUser
}