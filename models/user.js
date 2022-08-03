const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false

    }   
})

userSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uuid= _id
    return object;
 })



module.exports = model('User', userSchema);