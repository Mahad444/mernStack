const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");


const waiterSchema =  new Schema({
    secret:{
        type:String,
        required:[true, "Secret is required"]
    },
    pass:{
        type:String,
        required:[true,"Pass is Required"]
    },
    Name:{
        type:String,
        required:[true,"Name is Required"]
    }
});
waiterSchema.pre('save',async function (next){
    try{
        const salt = await bycrypt.genSalt(10);
        
        const hashedPass = await bycrypt.hash(this.secret,salt)
            this.secret = hashedPass; 
        next();

    }catch(error){
        next(error)
    }
    
    // const matchpas = await bycrypt.compare(pass,Waiter.pass)
    //     if (matchpas) throw Error("User exists Already")

})


module.exports = mongoose.model("waiter", waiterSchema);