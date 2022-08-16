const { response } =  require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { jwtGen } = require('../helpers/jwt')


const getUsers = async (req, res)=>{  
    const page = Number(req.query.page) || 1;
    const items = Number(req.query.items) || 5;


    const[users, total ] = await Promise.all([
        User.find()
            .skip((page-1)*items)
            .limit(items), 

        User.count()
    ])
    
    res.json({
        ok:true,
        users,
        total       
    })
}

const createUser = async(req, res = response)=>{   
    const { name, email, password } = req.body
        

    try {

        const emailExist = await User.findOne({email});

        if(emailExist){
            return  res.status(400).json({
                ok:false,
                msg: "El usuario ya está registrado",     
            })   
          
        }

        const user = new User( req.body )
        
        //hash password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //crear token
        token = await jwtGen(user.id)
    
        res.json({
            ok:true,
            usuario: user,  
            token   
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg: "Error al tratar de crear usuario... revisar registros"
            }
        )
    }   
   
}

const updateUser = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbUser = await User.findById( uuid )

        if(!dbUser){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el usuario"
            })
        }

        //update
        const { password, google, ...fields} = req.body;

        if(dbUser.email === fields.email){
            delete fields.email
        }else{
            const emailExist = await User.findOne({email: fields.email})
            if(emailExist){
                return res.status(400).json({
                    ok:false,
                    msg: "ya existe un usuario con ese correo en la base de datos"
                })
            }
        }
    
     

        const updatedUser = await User.findByIdAndUpdate(uuid, fields, { new:true })


        res.json({
            ok:true,           
            user: updatedUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error

        })
    }
}

const deleteUser = async (req, res=response)=>{
    // TODO: verificar el usuario

    const uuid = req.params.id

    try {
        const dbUser = await User.findById( uuid )

        if(!dbUser){
            return res.status(403).json({
                ok:false,
                msg: "no se encontró el usuario"
            })
        }

        //delete user      
        dbUser.delete()       

       
        res.json({
            ok: true,           
            msg: "usuario eliminado"
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
    getUsers, createUser, updateUser, deleteUser
} 