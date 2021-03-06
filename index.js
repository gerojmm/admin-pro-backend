const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear server
const app = express();

//COnfigura CORS
app.use(cors());



//Lectura y parseo del body
app.use(express.json());


//DB Connection
dbConnection();

//Directorio Público
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando por el puerto ${ process.env.PORT }`);
})
