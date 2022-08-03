
/* 
    route:api/login
 */


const { Router } = require( 'express' )
const { check } = require('express-validator')
const { login } = require('../controllers/AuthController')

const {fieldsValidate } = require('../middlewares/fieldsValidate')

const router = Router()

router.post('/', 
    [      
        check('password', 'El password es obligatorio').notEmpty(),
        check('email', 'Debe ser un email válido').isEmail(),
        fieldsValidate
    ],
    login
)


module.exports = router