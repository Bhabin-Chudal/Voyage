const express=require("express");
const router=express.Router({mergeParams:true})
const {Listing}=require("../models/listing");
const Review=require("../models/review");

const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
/**importing isLoggedIn middleware */
const {joiValidationReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

/** importing review controller*/
const {newRoute,createRoute,deleteRoute}=require("../controller/review.js");

/**Review routes */
router.get("/",newRoute)

router.post("/",isLoggedIn,joiValidationReview,wrapAsync(createRoute))

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteRoute));

module.exports=router;