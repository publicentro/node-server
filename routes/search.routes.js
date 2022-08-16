/* 
    route:api/search
 */


    const { Router } = require( 'express' )    
    const { searchAll, searchTable } = require('../controllers/SearchController')
    const { tokenValidate } = require('../middlewares/tokenValidate')
    
    const router = Router()
    
    
    
    
    router.post('/:q', [
        tokenValidate,                           
    ], searchAll )

    router.post('/table/:table/:q', [
        tokenValidate,                           
    ], searchTable )
    
  
    
    module.exports = router