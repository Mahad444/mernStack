const customer =require('../Model/customer')

module.exports ={
    customer:(req,res)=>{
        customer.create(req.body).then(customer =>{
            res.send({})
        });
    }
}