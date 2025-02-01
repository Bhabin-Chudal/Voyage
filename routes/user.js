const express=require("express");
const router=express.Router({mergeParams:true})
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport=require("passport");

/** importing user controller*/
const {signUpNewRoute,signUpCreateRoute,logInNewRoute,logInCreateRoute}=require("../controller/user.js");

router.get("/signup",signUpNewRoute);

router.post("/signup",wrapAsync(signUpCreateRoute))

router.get("/login",logInNewRoute)

router.post("/login", passport.authenticate('local',{failureRedirect: "/login",failureFlash:true}),logInCreateRoute)

router.get("/logout",(req,res)=>{
    
    req.logout(err=>{
        if(err){
            throw new ExpressError("500",err);
        }

        req.flash("success",` You are succesfully logged out !! `)
        res.redirect("/listings");
    })
})
module.exports=router;