
const { response } =  require('express')
const Medic = require('../models/Medic')
const { jwtGen } = require('../helpers/jwt')


const getMedics = async (req, res)=>{   

    const medics = await Medic.find().populate('user', 'name').populate("hospital", "name") 

    
    res.json({
        ok:true,
        medics       
    })
}

const createMedic = async(req, res = response)=>{   
    const uuid = req.uuid;
    const { name } = req.body        


    try {

        const nameExist = await Medic.findOne({name});
        

        if(nameExist){
            return  res.status(400).json({
                ok:false,
                msg: "Un Médico con este nombre ya está registrado",     
            })   
          
        }      
      

        const medic = new Medic({
            user: uuid,
            ...req.body
        } )
        
        await medic.save()       
    
        res.json({
            ok:true,
            medic: medic,   
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg: "Error al tratar de crear Médico... revisar registros"
            }
        )
    }   
   
}

const updateMedic = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbMedic = await Medic.findById( uuid )

        if(!dbMedic){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el Médico"
            })
        }

        //update
        const { ...fields} = req.body;

        if(dbMedic.name === fields.name){
            delete fields.name
        }else{
            const nameExist = await Medic.findOne({name: fields.name})
            if(nameExist){
                return res.status(400).json({
                    ok:false,
                    msg: "ya existe un Médico con este nombre en la base de datos"
                })
            }
        }
    
     

        const updatedMedic = await Medic.findByIdAndUpdate(uuid, fields, { new:true })


        res.json({
            ok:true,           
            Medic: updatedMedic
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error

        })
    }
}

const deleteMedic = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbMedic = await Medic.findById( uuid )

        if(!dbMedic){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el Médico"
            })
        }

        //delete Medic      
        dbMedic.delete()       

       
        res.json({
            ok: true,           
            msg: "Médico eliminado"
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
    getMedics, createMedic, updateMedic, deleteMedic
} 