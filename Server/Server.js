const express=require("express");

var app=express();


app.get('/',(req,res)=>{
    res.send({Name:'Mrityunjay Pandey'})
});

app.listen(2000,()=>{
    console.log('Server is running in port 2000')
});