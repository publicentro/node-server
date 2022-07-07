// getting-started.js
const mongoose = require('mongoose');


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DBKEY,{
         
          });

          console.log('DB Connected')
        
    } catch (error) {
        throw new Error('Algo salió mal con la conexión a la base de datos')
        console.log(error)
    }
}

module.exports={
    dbConnection
}

