const {Listing,listingSchema}=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {reviewSchemaJoi,listingSchemaJoi}=require("./joiServerValidation.js");
const isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){ //user is not logged-in
        req.flash("error","User must be logged in.");
        res.redirect("/login");
        return;
    }
    next();
}

/** Handling authorization of Update by matching user_id is same as owners._id */
const isOwner=async(req,res,next)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate("owner");

    if(listing.owner._id.equals(res.locals.currUser._id) && res.locals.currUser){ 
        next();
    }else{
        req.flash("error", "You don't have permission for it."); 
        res.redirect("/listings");
    }
}

/** Handling authorization of review delete by matching user_id is same as autor._id */
const isReviewAuthor=async(req,res,next)=>{
    let { id, reviewId } = req.params;
    
    const review=await Review.findById(reviewId).populate("author");
    console.log("review id is of: ",review);
    if(!review.author._id.equals(res.locals.currUser._id)){
        console.log("middleware user-id: ",res.locals.currUser._id,"and  reviewid : ", review._id);
        req.flash("error","You are not permitted to delete this review.")
        return res.redirect(`/listings/${id}/show`);
    }else{
        next();
    }


}
const joiValidation=((req,res,next)=>{
    let result=listingSchemaJoi.validate(req.body);  
    if(result.error){ 
        console.log(result.error);
        throw  new ExpressError(400,result.error);
    } else{
        next(); //if no error go for next thing.
    }
})



//error-handling middleware
const joiValidationReview=((req,res,next)=>{
    let result=reviewSchemaJoi.validate(req.body);  
    if(result.error){ 
        throw  new ExpressError(400,result.error);
    } else{
        next(); //if no error go for next thing.
    }
})

module.exports={isLoggedIn,isOwner,joiValidation,joiValidationReview,isReviewAuthor};