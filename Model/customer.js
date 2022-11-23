const mongoose= require('mongoose')
const Schema = mongoose.Schema

const  customerSchema = new Schema({
    firstName:{
    type:String,
    required:[true, "firstName is Required"]
    
    },

    lastName:{
        type:String,
        required:[true, "LastName is Required"] 
    },

    email:{
        type:String,
        required:[true,"Email is Required"]
    },

    password:{
        type:String,
        required:[true, "Password is required"]
    },
    
    phoneNumber:{
        type:String,
        required:[false, 'phoneNumber is Required']
    }

})

module.exports = mongoose.model('customer', customerSchema);