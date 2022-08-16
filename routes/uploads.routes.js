/* 
    route:api/uploads
 */


    const { Router } = require( 'express' )    
    const { uploadAvatar, getAvatar } = require('../controllers/UploadController')
    const fileUpload = require('express-fileupload');
    const { tokenValidate } = require('../middlewares/tokenValidate')
    
    const router = Router()
    
    router.use(fileUpload());
    
    
    router.put('/avatar/:model/:id', [
        tokenValidate,                           
    ], uploadAvatar )

    router.get('/avatar/:model/:file', [
                               
    ], getAvatar )
   
  
    
    module.exports = router