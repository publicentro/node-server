/* 
    route:api/hospitals
 */


    const { Router } = require( 'express' )
    const { check } = require('express-validator')
    const { getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/HospitalController')
    const {fieldsValidate } = require('../middlewares/fieldsValidate')
    const { tokenValidate } = require('../middlewares/tokenValidate')
    
    const router = Router()
    
    
    router.get('/',tokenValidate ,getHospitals )
    
    router.post('/', [
        tokenValidate,
        check('name', 'El nombre es obligatorio').notEmpty(),
        fieldsValidate
    ], createHospital )
    
    router.put('/:id',[
        tokenValidate,
        check('name', 'El nombre es obligatorio').notEmpty(),
        fieldsValidate
    ] ,updateHospital )
    
    router.delete('/:id',tokenValidate, deleteHospital)
    
    module.exports = router