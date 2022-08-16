const { response } =  require('express')

const User = require('../models/user')
const Hospital = require('../models/Hospital')
const Medic = require('../models/Medic')



const searchAll = async (req, res)=>{  

    const query = req.params.q
    const regex = new RegExp( query, "i" )

    const [users, hospitals, medics] = await Promise.all([
        User.find({name : regex}),
        Hospital.find({name : regex}).populate("user", "name"),
        Medic.find({name : regex}).populate("user", "name").populate("hospital", "name")
    ])
    
 
    res.json({
        ok:true,
        users,
        hospitals,
        medics,
        query      
    })
}
const searchTable = async (req, res)=>{  

    const table = req.params.table;
    const query = req.params.q;
    const regex = new RegExp( query, "i" )
    let data; 


    switch (table) {
        case "users": 
            data =  await User.find({name : regex}).limit(5)    
            break;
        case "hospitals": 
            data = await  Hospital.find({name : regex}).populate("user", "name").limit(5)
            break;
        case "medics": 
            data = await  Medic.find({name : regex}).populate("user", "name").populate("hospital", "name").limit(5)    
            break;
    
        default:
            return res.status(400).json({
                        ok: false,
                        msg: "La tabla debe ser users, hospitals o medics"
                    })           
    } 
 
    
 
    res.json({
        ok:true,
        data   
    })
}
module.exports = {
    searchAll,
    searchTable
}