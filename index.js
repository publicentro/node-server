//importaciones
const express = require('express');
const { dbConnection } = require('./database/config');
const cors =require('cors')

require("dotenv").config();


//inicializar el servidor
app = express()

//configurar cors
app.use(cors())

//conexion a la base de datos
dbConnection()

//lecura del body
app.use(express.json())

//rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/login', require('./routes/auth.route'))
app.use('/api/hospitals', require('./routes/hospitals.route'))
app.use('/api/medics', require('./routes/medics.routes'))
app.use('/api/search', require('./routes/search.routes'))
app.use('/api/uploads', require('./routes/uploads.routes'))


//levantar el servidor de express

app.listen(process.env.PORT, ()=>{
   
    console.log( 'Servidor corriendo en el puerto '+ process.env.PORT )
});