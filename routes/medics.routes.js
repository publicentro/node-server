/* 
    route:api/medics
 */


    const { Router } = require( 'express' )
    const { check } = require('express-validator')
    const { getMedics, createMedic, updateMedic, deleteMedic} = require('../controllers/MedicController')
    const {fieldsValidate } = require('../middlewares/fieldsValidate')
    const { tokenValidate } = require('../middlewares/tokenValidate')
    
    const router = Router()
    
    
    router.get('/',tokenValidate ,getMedics )
    
    router.post('/', [
        tokenValidate,
        check('name', 'El nombre es obligatorio').notEmpty(),        
        check('hospital', 'Debe ser un id valido').isMongoId(),        
        fieldsValidate
    ], createMedic )
    
    router.put('/:id',[
        tokenValidate,
        check('name', 'El nombre es obligatorio').notEmpty(),
        fieldsValidate
    ] ,updateMedic )
    
    router.delete('/:id',tokenValidate, deleteMedic)
    
    module.exports = router