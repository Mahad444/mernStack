const customer =require('../Model/customer')
const menu = require('../Model/menu')
const auths = require('../Authentication/authSchema')
const creatError = require('http-errors');
const choice = require("../Controllers/choiceSchema")

module.exports ={
    customer:async (req,res,next)=>{
        try{
        const {firstName,lastName,email,password,phoneNumber} =  await auths.validateAsync(req.body);

         const exists = await customer.findOne({email:email})
         const exist = await customer.findOne({phoneNumber:phoneNumber})

         if (exists) throw creatError.Conflict(`${email} has already been registered`) ;
         if (exist) throw creatError.Conflict (`${phoneNumber} has been registered`);


         const user = new customer({email,password,phoneNumber,firstName,lastName});

        const savedUser = user.save()

            res.send(savedUser)
        }
            catch(err){
                next(err);
                 }
    },
    menu:async(req,res)=>{
        try{

            const {foodType,quantity,drinkType} = await choice.validateAsync(req.body);
             await menu.create({foodType:foodType,quantity:quantity,drinkType:drinkType}).then(menu =>{    
            res.send(menu)
  });

        }
        catch(err){
            next(err)
        }
    },
    menusee:async(req,res,next)=>{
try{

    await menu.find({}).then(menu=>{
        res.send(menu)
    })
}catch(err){
    next(err)
}
    }
}