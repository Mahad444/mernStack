const JWT = require('jsonwebtoken');
// const creatError = require('http-errors')
require('dotenv').config()

module.exports ={
    signAccessToken:(CusId) =>{
        return new Promise ((resolve,reject)=>{
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options ={
                expiresIn :'1h',
                issuer:'Duke Technologies.com',
                audience:`${CusId}`,
            }
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },

    signRefreshToken:(CusId) =>{
        return new Promise ((resolve,reject)=>{
            const payload ={}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options ={
                expiresIn :'1y',
                issuer:'MahadSaid Technologies.com',
                audience:CusId,
            }
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },
    
    //  Middleware to verify token
verifyAccesToken:(req,res,next)=>{
    if (!req.headers["authorization"])
    return next (creatError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken =authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            return next(creatError.Unauthorized("Unauthorized User"))
        }
        req.payload = payload;
        next() 
    })
} 
}