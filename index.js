//importaciones
const express = require('express');
const { dbConnection } = require('./database/config');
const cors =require('cors')

require('dotenv').config()

//inicializar el servidor
app = express()

//configurar cors
app.use(cors())

//conexion a la base de datos
dbConnection()

//rutas
app.get('/', (req, res)=>{
    res.json({
        ok:true,
        msg: "en la ruta /"
    })
})

//levantar el servidor de express

app.listen(process.env.PORT, ()=>{
    console.log( 'Servidor corriendo en el puerto 3000' )
});