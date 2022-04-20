const Medico = require('../models/medicos'); 

const getMedicos = async (req, res) => {

const medicos = await Medico
                                .find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    });
};


const createMedicos = async (req, res) => {
    const uid = req.uid;
    
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    };

};

const updateMedicos = (req, res) => {
    res.json({
        ok: true,
        msg: 'it works'
    });
}

const deleteMedicos = (req, res) => {
    res.json({
        ok: true,
        msg: 'it works'
    });
};


module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}