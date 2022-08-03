/* 
    route:api/users
 */


const { Router } = require( 'express' )
const { check } = require('express-validator')
const { getUsers, createUser, updateUser, deleteUser} = require('../controllers/UserController')
const {fieldsValidate } = require('../middlewares/fieldsValidate')
const { tokenValidate } = require('../middlewares/tokenValidate')

const router = Router()


router.get('/',tokenValidate ,getUsers )

router.post('/', [
    tokenValidate,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    fieldsValidate
], createUser )

router.put('/:id',[
    tokenValidate,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    fieldsValidate
] ,updateUser )

router.delete('/:id',tokenValidate, deleteUser)

module.exports = router