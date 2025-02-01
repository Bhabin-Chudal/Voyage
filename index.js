if(process.env.NODE_ENV!="production"){ // stores in dotenv only if you are in develop
    require('dotenv').config()
}


//express and ejs
const express=require("express");
const path=require("path");
const ejsMate = require('ejs-mate');



const app=express();
//setting view engine/template to ejs and their path as well
app.set("view engine","ejs");
app.engine('ejs', ejsMate)
app.set("views",path.join(__dirname,"views"));

//requiring other relative models
const ExpressError=require("./utils/ExpressError");
const User=require("./models/user.js");

/**for route */
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

/**session flash and password: session is always first because password uses session */
const session=require("express-session");
const MongoStore = require('connect-mongo'); //for cloud session storage.
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");

//database connection And Initialization:
console.log("Atlas url is ",process.env.ATLAS_URL);
const mongoose=require("mongoose");
async function  main(){
    await mongoose.connect(process.env.ATLAS_URL);
}

main()
.then(()=>console.log("connected to database successfully."))
.catch(err=>console.log(err));



//middleware:
//inbuilt-middleware for body-parser
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

//Third-party middleware:
const methodOverride=require("method-override");
app.use(methodOverride('_method'));
/**mongo-connect */
let store=MongoStore.create({
    mongoUrl: process.env.ATLAS_URL,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*3600 //this is stored in seconds. so 24hrs=24*3600
})

/**express-session */
const sessionOption={
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store: store,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true //to avoid cross scripting attacks.
    }
}
app.use(session(sessionOption))


/**flash is used with session so should be after session and or before express router */
app.use(flash());

//passport strategy configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate uer using passport's local strategy.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/**storing flaßsh for every route in res.locals.message , if route contains flash message */
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    console.log("The logged user is: ");
    console.log(req.user);
    next();
})
/** express router  */
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);





// Routes

app.listen(8080,()=>{
    console.log("listening to port 8080");
})
//home route
app.get("/",(req,res)=>{
    res.send("Home route is working!!");
})





app.get("*",(req,res,next)=>{ //route that catch all other route than above
    throw new ExpressError(404,"Page Not Found");
})


app.use((err,req,res,next)=>{
    console.log(err);
    let{statusCode=500,message="Some Error Occured"}=err; //default because some error like syntax error doesnot throw status code and our error handling function sends response before sending it to default error handling middleware
    res.status(statusCode).render("./listings/error.ejs",{message,statusCode});
})