const Medico = require("../models/medicos");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");

const getAll = async (req, res) => {
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}



const getDocumentoColeccion = async (req, res) => {
    let data = [];
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre img');
            break;
            case 'usuarios':
            data = await Usuario.find({ nombre: regex });
                break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'No se encuentra la colección buscada'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}


module.exports = {
    getAll,
    getDocumentoColeccion
}