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

const getMedicoById = async (req, res) => {
    const id = req.params.uid;
    try {
        const medico = await Medico
                                .findById(id)
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')
        
            res.json({
                ok: true,
                medico
            })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Médico no encontrado'
        });
    }
}


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

const updateMedicos = async (req, res) => {
    const id = req.params.uid;
    

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        } 

        const dataMedico = {
            ...req.body,
            usuario: req.uid
        }

        const medicoUpdated = await Medico.findByIdAndUpdate(id, dataMedico, { new: true })

        res.json({
            ok: true,
            msg: 'Medico Actualizado',
            medicoUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }


}

const deleteMedicos = async (req, res) => {
    const id = req.params.uid;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        } 

        await Medico.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    };
};


module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos,
    getMedicoById
}