const express=require("express");
const Admin=require("../model/Admin")
const bodyParser = require('body-parser');

var app=express();
var jsonParser = bodyParser.json();



app.get('/',(req,res)=>{

    Admin.count(function (err, count) {
        if (!err && count === 0) {
            return  res.send("0")
        }
        res.send("1");
    });

});

app.post('/create_admin',jsonParser,(req,res)=>{
    var admin=new Admin(req.body);
    admin.save().then(()=>{
        res.send(admin);
    }).catch((e)=>{
        res.send(e)
    })
});

app.listen(2000,()=>{
    console.log('Server is running in port 2000')
});