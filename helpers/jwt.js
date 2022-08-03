const jwt = require('jsonwebtoken')

const jwtGen = (uuid)=>{

    return new Promise((resolve, reject)=>{
        const payload = {
            uuid
        }
    
        jwt.sign( payload,  process.env.key, { expiresIn: '24h' }, (error, token)=>{

            if(error){
                console.log(error)
                reject(error)
            }

            resolve(token)
        })

    }) 

}

module.exports = {
    jwtGen
}