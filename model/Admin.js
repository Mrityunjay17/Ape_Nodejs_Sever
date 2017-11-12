const mongoose=require("../database/mongo-db");
const validator = require('validator');

var AdminShema=new mongoose.Schema({
    First_Name:{
        type:String,
        required:[true,'First Name is required'],
        minlength:1,
        trim:true
    },
    Middle_Name: {
        type: String,
        trim: true,
    },
    Last_Name:{
        type:String,
        trim:true
    },
    Date_Of_Birth:{
        type:Date,
        required:[true,'Date Of Birth is required'],
        minlength:1,
        trim:true
    },
    Sex:{
        type:String,
        required:[true,'Gender is required'],
        maxlength:[1,"Not more than 1"],
        trim:true
    },
    Guardian_First_name:{
        type:String,
        required:[true,'Guardian First Name is required'],
        minlength:1,
        trim:true
    },
    Guardian_Middle_name:{
        type:String,
        trim:true
    },
    Guardian_Last_name:{
        type:String,
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
        required: [true,'Password required'],
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