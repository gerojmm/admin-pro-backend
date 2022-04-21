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

const updateHospitales = async (req, res) => {
    const id = req.params.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        } 

        const dataHospital = {
            ...req.body,
            usuario: req.uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, dataHospital, { new: true });
        
        res.json({
            ok: true,
            msg: 'Hospital Actualizado',
            hospitalUpdated
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    };
}

const deleteHospitales = async (req, res) => {
    const id = req.params.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        } 

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    };
};


module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}