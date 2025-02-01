const Review=require("../models/review");
const {Listing}=require("../models/listing");
const newRoute=(req,res)=>{
    let {id}=req.params;
    res.render("./listings/review.ejs",{id});
}
const createRoute=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    const newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log("new Review: ",newReview);
    console.log("User saved in database",req.user._id);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}/show`)
    console.log("It worked");
}

const deleteRoute=async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/listings/${id}/show`);
}

module.exports={newRoute,createRoute,deleteRoute}