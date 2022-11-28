const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");


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
waiterSchema.pre('save',async function (next){
    try{
        const salt = await bycrypt.genSalt(10);
        
        const hashedPass = await bycrypt.hash(this.pass,salt)
            this.pass = hashedPass; 
        next();

    }catch(error){
        next(error)
    }
})


module.exports = mongoose.model("waiter", waiterSchema);