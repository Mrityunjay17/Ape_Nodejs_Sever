const mongoose=require("../database/mongo-db");
const validator = require('validator');

var AdminShema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    Middlename: {
        type: String,
        trim: true,
    },
    Lastname:{
        type:String,
        trim:true
    },
    DateofBirth:{
        type:Date,
        required:true,
        minlength:1,
        trim:true
    },
    Sex:{
        type:String,
        required:true,
        maxlength:[1,"Not more than 1"],
        trim:true
    },
    Guardianname:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    EmailId: {
        type: String,
        required: [true,'Email ID required'],
        trim: true,
        unique: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    Mobile:{
        type:String,
        required: [true,'Mobile Number required'],
        trim: true,
        unique: true,
        minlength: 1,
        validate: {
            validator: (value)=>{
                return validator.isMobilePhone(value,'en-US')
            },
            message: '{VALUE} is not a valid Mobile Number'
        }
    },
    Password:{
        minlength: 6,
        type: String,
        required: true,
        trim: true
    }
});


AdminShema.statics.login = function (email, password) {
    var User = this;
    return User.findOne({ EmailId: email,Password:password }).then((user) => {

        if (!user) {
            return Promise.reject('User Not Found');
        }
        return user;
    }).catch((e)=>{
        return Promise.reject(e);
    })
};


var Admin=mongoose.model('admin',AdminShema);

module.exports=Admin;