const User=require("../models/user");
const ExpressError = require("../utils/ExpressError");


const signUpNewRoute=(req,res)=>{
    res.render("./listings/signup.ejs");
}

const signUpCreateRoute=async(req,res)=>{
    try{
        let {username,email,password,reenterpassword}=req.body.user;
        console.log(password);
        if(password!=reenterpassword){
            throw new ExpressError(400,"Your password doesnot match");
        }else{
            const newUser=new User({
                username:username,
                email:email,
            // password:password not storing password because we pass that on register
            })

            const registeredUser=await User.register(newUser,password);
            // logging in the signed user
            req.login(registeredUser,err=>{
                if(err){
                    throw new ExpressError("500",err);
                }
                req.flash("success","Welcome to VOYAGE !!");
                res.redirect("/listings");
            })
        }
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}


const logInNewRoute=(req,res)=>{ 
    console.log("Routes to be redirected");
    res.render("./listings/login.ejs");

}


const logInCreateRoute=(req,res)=>{
    req.flash("success","Welcome to VOYAGE!!");
    res.redirect("/listings");
}





module.exports={signUpNewRoute,signUpCreateRoute,logInNewRoute,logInCreateRoute}