const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexión con BD Exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('Error de Conexión con la BD');
    }
    
};

module.exports = {
    dbConnection
}