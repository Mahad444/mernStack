const mongoose = require('mongoose');
const Schema = mongoose.Schema

const menuList = new Schema ({

    foodType:{
        type:String,
        required:[true,"Food type is Required"],

        // Requirement for foodquantity
        // foodQuantity:{
        //     required:true
        // }
    },
    drinkType:{
        type:String,
        required:[true]
    },
    quantity:{
        type:String,
        required:[true,"This Input Is Required"]
    }

})
module.exports = mongoose.model('menu',menuList);