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

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
/* app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});  */

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando por el puerto ${ process.env.PORT }`);
})

//iwZ0PIIqlH1taxBv
//mean_user