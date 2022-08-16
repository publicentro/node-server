const { response } =  require('express')
const bcrypt = require('bcryptjs')
const Hospital = require('../models/Hospital')
const { jwtGen } = require('../helpers/jwt')


const getHospitals = async (req, res)=>{   

    const hospitals = await Hospital.find().populate('user', 'name')

    
    res.json({
        ok:true,
        hospitals,        
    })
}

const createHospital = async (req, res = response)=>{   
    const { name } = req.body
    const uuid = req.uuid
        

    try {

        const nameExist = await Hospital.findOne({name});

        if(nameExist){
            return  res.status(400).json({
                ok: false,
                msg: "Un hospital con este nombre ya está registrado",     
            })   
          
        }

        const hospital = new Hospital( {
            ...req.body, 
            user: uuid
        })
        
        await hospital.save()       
    
        res.json({
            ok:true,
            hospital: hospital,  
        
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg: "Error al tratar de crear Hospital... revisar registros"
            }
        )
    }   
   
}

const updateHospital = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbHospital = await Hospital.findById( uuid )

        if(!dbHospital){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el hospital"
            })
        }

        //update
        const { ...fields} = req.body;

        if(dbHospital.name === fields.name){
            delete fields.name
        }else{
            const nameExist = await Hospital.findOne({name: fields.name})
            if(nameExist){
                return res.status(400).json({
                    ok:false,
                    msg: "ya existe un hospital con este nombre en la base de datos"
                })
            }
        }
    
     

        const updatedHospital = await Hospital.findByIdAndUpdate(uuid, fields, { new:true })


        res.json({
            ok:true,           
            hospital: updatedHospital
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error

        })
    }
}

const deleteHospital = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbHospital = await Hospital.findById( uuid )

        if(!dbHospital){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el hospital"
            })
        }

        //delete hospital      
        dbHospital.delete()       

       
        res.json({
            ok: true,           
            msg: "hospital eliminado"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
}





module.exports = {
    getHospitals, createHospital, updateHospital, deleteHospital
} 