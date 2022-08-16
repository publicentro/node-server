const {Schema, model} = require('mongoose');

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },   
    image:{
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },       
})

HospitalSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    //object.uuid = _id
    return object;
 })



module.exports = model('Hospital', HospitalSchema);