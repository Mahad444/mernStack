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
    phoneNumber:{
        type:String,
        required:[true, 'phoneNumber is Required']
    }

})

module.exports = mongoose.model('customer', customerSchema);