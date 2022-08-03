
const { response } =  require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const  { jwtGen }  = require('../helpers/jwt')

const login = async (req, res = response) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "Credenciales no válidas"
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: "Credenciales no válidas"
            })
        }

        //token
        const token = await jwtGen(user.id)

        res.json({
            ok:true,
            user,
            token
        })
        
    } catch (error) {
        console.log( error )

        res.status(500).json({
            ok: false,
            msg: "Algo salió mal verifique con el administrador"

        })
    }
}


module.exports = { login }