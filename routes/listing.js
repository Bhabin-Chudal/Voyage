const express=require("express");
const router=express.Router();
const {Listing,listingSchema}=require("../models/listing");
const {listingSchemaJoi,reviewSchemaJoi}=require("../joiServerValidation.js");
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const maplibregl = require('maplibre-gl');
/** Requiring the cloudinary and storage */
const {cloudinary,storage}=require("../cloudConfig.js");  




/**multer for multipart encoded data */
const multer  = require('multer') 
const upload = multer({storage}); //store the data in cloudinary storage

/**importing controller */
const {indexRoute,showRoute,newRoute,createRoute,editRoute,updateRoute,deleteRoute}=require("../controller/listing.js");

/**importing  middlewares */
const {isLoggedIn,isOwner,joiValidation}=require("../middleware.js");


//index route to give homepage
router.get("/",wrapAsync(indexRoute))

//read route /show route-> give detailed information when pressed particular listing from homepage 
router.get("/:id/show",isLoggedIn,wrapAsync(showRoute))

router.get("/new",isLoggedIn,newRoute)

router.post("/",isLoggedIn,upload.single("listing[image]"),joiValidation,wrapAsync(createRoute)) //upload.single("listing[image]"),


router.get("/:id/edit",isLoggedIn,wrapAsync(editRoute))

router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),joiValidation,wrapAsync(updateRoute))

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(deleteRoute))

module.exports=router;
