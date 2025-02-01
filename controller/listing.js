const {Listing}=require("../models/listing");

require('dotenv').config();
/**Requiring map-box sdk services from github */
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
let mapToken=process.env.MAP_TOKEN;
console.log("map token is: ",mapToken)
const geoCodingClient = mbxGeocoding({ accessToken: mapToken});

const indexRoute=async (req,res)=>{
    const listings=await Listing.find({});
    res.render("./listings/index.ejs",{listings});
}

const showRoute=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      }
    })
    .populate("owner");
  
  
    /**handling  error if someone sends the valid deleted-id for show route or anycase when listing is empty. */
    if(!listing){
        req.flash("error","No such Listing exists.")
        res.redirect("/listings");
    }
    console.log("Listing from show route",listing.reviews.author);
    res.render("./listings/show.ejs",{listing});
}

const newRoute=(req,res)=>{
   
    res.render("./listings/new.ejs");
}

const createRoute=async(req,res)=>{
    let response=await geoCodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();

    
        let coordinates=response.body.features[0].geometry.coordinates;
    /**Saving link in mongodb */
    let url=req.file.path;
    let filename=req.file.filename;
    console.log("file and url name is",filename ,url);
    let {title,description,image,price,location,country}=req.body;
    let newListing=new Listing({...req.body.listing});
    newListing.image.filename=filename;
    newListing.image.url=url;
    newListing.owner=req.user._id;
    newListing.geometry=response.body.features[0].geometry;
    console.log(newListing);
    const savedData= await newListing.save();
    console.log("New Listing is updated to ", savedData);
    req.flash("success", "New Listing successfully added."); 
    res.redirect("/listings");
}


const editRoute=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    //transforming image quality to low while displaying for edit
    let originalUrl=listing.image.url;
    let lowImage=originalUrl.replace("/upload","/upload/ar_1.0,c_fill,e_blur:85,h_150,w_250");
    console.log(listing);
    res.render("./listings/edit.ejs",{listing,lowImage});
}

const updateRoute=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findByIdAndUpdate(id, { $set: { ...req.body.listing } },{runValidators:true}, { new: true });

    //check if req.file exist meaning  image is updated in it
    if( req.file){
        let url=req.file.path;
        let filename=req.file.pathfilenamename;
        listing.image.url=url;
        listing.image.filename=filename;
        await listing.save();
    }

    req.flash("success", "Listing successfully updated."); 
    res.redirect("/listings");

}

const deleteRoute=async(req,res)=>{
    let {id}=req.params;
    const data=await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing successfully deleted."); 
    res.redirect("/listings"); 
}

module.exports={indexRoute,showRoute,newRoute,createRoute,editRoute,updateRoute,deleteRoute}