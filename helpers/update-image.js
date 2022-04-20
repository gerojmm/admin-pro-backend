const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');

const updateImage = async (tipo, id,  nombreArchivo) => {
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe el id');
                return false;
            }

            const oldPathMedico = `./uploads/medicos/${medico.img}`;
            if (fs.existsSync(oldPathMedico)) fs.unlinkSync(oldPathMedico);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
        break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe el id');
                return false;
            }

            const oldPathUsaurios = `./uploads/usuarios/${usuario.img}`;
            if (fs.existsSync(oldPathUsaurios)) fs.unlinkSync(oldPathUsaurios);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            console.log(':::hospital', hospital);
            if (!hospital) {
                return false;
            }

            const oldPathHospital = `./uploads/hospitales/${hospital.img}`;
            if (fs.existsSync(oldPathHospital)) fs.unlinkSync(oldPathHospital);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
    }
}

module.exports = {
    updateImage
}