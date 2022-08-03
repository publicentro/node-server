const { response } = require('express')
const  jwt  = require('jsonwebtoken')

const tokenValidate = (req, res=response, next)=>{

    const token =req.header('x-token') 
  
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"Usuario no autenticado"
        })
    }

    try {

        const { uuid } = jwt.verify(token, process.env.KEY )

        req.uuid = uuid; 

    } catch (error) {
       return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

    next()
}


module.exports ={
    tokenValidate
}
