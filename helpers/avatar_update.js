const User = require('../models/user');
const Hospital = require('../models/Hospital');
const Medic = require('../models/Medic')
const fs = require('fs')


//borrar imagen si existe
const imageDelete= ( path )=>{
    if( fs.existsSync( path ) ){
        fs.unlinkSync(path)
    }

}

const avatarUpdate = async (model, id, path, fileName)=>{

    let oldPath ='';

  switch (model) {
    case 'hospitals':
        const hospital = await Hospital.findById(id);

        if(! hospital){
            return false
        }

        oldPath = `./uploads/hospitals/${ hospital.image }`;
        imageDelete( oldPath );
      

        hospital.image = fileName;
        await hospital.save();
        return true;
        
        break;
    case 'users':
        const user = await User.findById(id);

        if(! user ){
            return false
        }

        oldPath = `./uploads/users/${ user.image }`;
        imageDelete( oldPath );
             
        user.image = fileName;
        await user.save();

        return true;        
        break;

    case 'medics':
        const medic = await Medic.findById(id);

        if(! medic){
            return false
        }

        oldPath = `./uploads/medics/${ medic.image }`;
        imageDelete( oldPath );
      

        medic.image = fileName;
        await medic.save();
        return true;
        
        break;
  
    default:
        break;
  }
    

}

module.exports = {
    avatarUpdate
}