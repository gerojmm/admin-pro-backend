const Hospital = require('../models/hospital'); 

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre')

    res.json({
        ok: true,
        hospitales
    });
};


const createHospitales = async (req, res) => {
    
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    };


    res.json({
        ok: true,
        msg: 'it works'
    });
};

const updateHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'it works'
    });
}

const deleteHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'it works'
    });
};


module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}