const mongoose = require('mongoose');
const bycrypt = require("bcrypt");

const Schema = mongoose.Schema

const waiterSchema =  new Schema({
    pass:{
        type:String,
        required:[true, "Pass is required"]
    },
    Name:{
        type:String,
        required:[true,"Name is Required"]
    }
});
// waiterSchema.pre('save',async (next)=>{
//     try{
//         const salt = await bycrypt.genSalt(10);
//         const hashedPass = await bycrypt.hash(this.pass, salt)
//         this.pass = hashedPass;
//         next();

//     }catch(error){
//         next(error)
//     }
// })
waiterSchema.method.isValidPass = async (pass) => {
    try{
    return await bycrypt.compare(pass,this.pass)
    }catch(error){
        throw error;
    }
}

module.exports = mongoose.model("waiter", waiterSchema);