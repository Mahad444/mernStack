const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const hashing = require('bcrypt');

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

});
customerSchema.pre('save', async function(next){
    try{
        const salt = await hashing.genSalt(10);
        const hashedPassword = await hashing.hash(this.password, salt);
        this.password =hashedPassword;
        next();
    }catch(error){
        next(error)

    }
});

 customerSchema.methods.isValidPassword = async function(password){
    try{
        return await hashing.compare(password,this.password);
    }catch(error){
        throw error;
    }
    
 }

module.exports = mongoose.model('customer', customerSchema);