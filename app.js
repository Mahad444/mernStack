const express = require ('express');
const app = express()
const mongoose = require('mongoose');
const bodyPaser= require('body-parser');
const routes = require('./Routes/api')



app.use(bodyPaser.json());

app.listen(7500,()=>{
    console.log("listening to http://localhost:7500")
})

app.use(routes);






mongoose.connect("mongodb://localhost:27017/CoffeeShopDb")
