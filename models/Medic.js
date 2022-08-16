const {Schema, model} = require('mongoose');

const MedicSchema = new Schema({
    name: {
        type: String,
        required: true
    },   
    image:{
        type: String,
    },
    user:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }    
})

MedicSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    //object.uuid= _id
    return object;
 })



module.exports = model('Medic', MedicSchema);