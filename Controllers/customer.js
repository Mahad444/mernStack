const customer =require('../Model/customer');
const menu = require('../Model/menu');
const auths = require('../Authentication/authSchema');
const creatError = require('http-errors');
const choice = require("../Authentication/choiceSchema");
const waiterauth  = require('../Authentication/waiterSchema');
const Waiter = require("../Model/waiter"); 

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
    },
    // Waiter on being Registered
    access:async(req,res,next)=>{
        try{

        const {pass,Name} = await waiterauth.validateAsync(req.body);
        // Existance of the Waiter in the System by pass
        const exists = await Waiter.findOne({pass:pass})
        if (exists) throw creatError.Conflict(`${pass} exists Already`);


        await Waiter.create({pass:pass,Name:Name}).then(waiters =>{
            res.send(waiters)
        })

        }catch(err){
            next(err)
        }
    },
    // waiter when logging in

    grant:async(req,res,next)=>{
        try{
        const {pass,Name} = await waiterauth.validateAsync(req.body);

        const user = await Waiter.findOne({pass:pass,Name:Name})
        if(!user) throw creatError.NotFound (`User not Registered`)

        const matching = [user.Name, user.pass]
        if(!matching) throw Error("UserName or Password is invalid")

         const success = await (user.id)
 
         res.send("Logged in Successfully")
        }catch(error){
            if(error.isJoi===true)
        return next (creatError.BadRequest("Invalid Username or Password"))
            
            next(error)
        }

    }

}