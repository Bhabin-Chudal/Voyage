const mongoose=require("mongoose");
const passport = require("passport");
const passportLocalMongoose=require("passport-local-mongoose")

//to implement passportLocalMongoose as plugin we need model where we want to add it as plugin, say User.plugin(passportLocalMongoose)

const userSchema= new mongoose. Schema({
    email:{
        type:String,
        required:true
    }
})
userSchema.plugin(passportLocalMongoose); //this plugin provides hashed username , passport and salt by default.


const User=mongoose.model("User",userSchema);

module.exports=User;

