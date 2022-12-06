const Customer = require('../Model/customer');
const menu = require('../Model/menu');
const customerauths = require('../Authentication/authSchema');
const creatError = require('http-errors');
const choice = require("../Authentication/choiceSchema");
const waiterauth  = require('../Authentication/waiterSchema');
const Waiter = require("../Model/waiter"); 
const bycrypt = require('bcrypt');
const {signAccessToken }= require('../Authentication/jwthelper')


module.exports ={
    customer:async (req,res,next)=>{
        try{
        const {firstName,lastName,email,password,phoneNumber} =  await customerauths.validateAsync(req.body);

         const exists = await Customer.findOne({email:email})
         const exist = await Customer.findOne({phoneNumber:phoneNumber})

         if (exists) throw creatError.Conflict(`${email} has already been registered`) ;
         if (exist) throw creatError.Conflict (`${phoneNumber} has been registered`);


         const user = new Customer({email,password,phoneNumber,firstName,lastName});

        const savedUser = user.save();

        const accessToken = await signAccessToken (savedUser.id)

            res.send({accessToken})
        }
            catch(err){
                next(err);
                 }
    },

    login:async (req,res,next)=>{
        try{
            const {email,password} = req.body;
            
            const exists = await Customer.findOne({email:email});

            if (!exists) throw Error ("User Not Registered") 

            const match = await  bycrypt.compare(password,exists.password);

            if (!match) throw Error ("Invalid email or Password")
             
            res.send("logged in successfully")

        }catch(err){
            next(err.isjoi===true)
            return (Error("invalid email or password")) 
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

        const {pass,secret,Name} = await waiterauth.validateAsync(req.body)
 
        // Existance of the Waiter in the System by pass
        const exists = await Waiter.findOne({pass:pass}) 
        if( exists) throw Error (`${pass} exists Already`) 

        // Validating of waiters,the pass cannot be password 

        if(pass === secret) throw Error ("Pass Cannot be The Password")
         
         const waiterr  = new Waiter({secret:secret,pass:pass,Name:Name})

         const savedUser = waiterr.save(); 

         const accessToken = await signAccessToken(savedUser.id)
            res.send({accessToken}); 


        }catch(err){
                next(err)
        }
    },
    // waiter when logging in

    grant:async(req,res,next)=>{
        try{
        const {secret,pass} = req.body;

        const user = await Waiter.findOne({pass:pass}) 
        if(!user) throw creatError.NotFound (`User not Registered`)

    
        const matching =  await bycrypt.compare(secret,user.secret)

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