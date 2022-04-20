const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const path = require('path');
const fs = require('fs');


const fileUpload = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const id = req.params.id;
        const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                msg: 'Tipo no válido'
            });
        }

        //validar si existe el archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msf: 'No se seleccionó ningún archivo'
            });
        }

        //precesar imagen
        const file = req.files.imagen;
        const nombreCorto = file.name.split('.');
        const extension = nombreCorto[ nombreCorto.length - 1];

        const extensionesValidas = ['jpg', 'jpeg', 'gif', 'png'];

        if (!extensionesValidas.includes(extension)) {
            return res.status(400).json({
                ok: false,
                msf: 'Formato Inválido'
            }); 
        }

        const nombreArchivo = `${uuidv4()}.${extension}`;

        //Path para guardar archivo
        const path = `./uploads/${tipo}/${nombreArchivo}`

        //Actiualizar BD
        const imageUpdated = await updateImage(tipo, id, nombreArchivo);
        if (!imageUpdated) {
            return res.status(500).json({
                ok: false,
                msf: 'Error al cargar la imagen'
            }); 
        }

        //mover la imagen
        file.mv(path, function(err) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msf: 'Error al mover la imagen'
                }); 
            }
        });

        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error'
        });
    }

}

const returnImage = (req, res) => {
    const tipo = req.params.tipo;
    const image = req.params.image;

    const pathImage = path.join(__dirname, `../uploads/${tipo}/${image}`);
    
    if (!fs.existsSync(pathImage)) {
        const pathImage = path.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImage);
    } else {
        res.sendFile(pathImage);
    }


   
}

module.exports = {
    fileUpload,
    returnImage
}