const {mongoose,Schema}=require("mongoose");
const Review=require("./review");
const listingSchema=new mongoose.Schema({
    title:String,
    description:String,
    image:{
       url:String,
       filename:String
    },
    
    price: {
        type:Number,
        validate: {
            validator: function(value) {
                return typeof value === 'number' && value >= 0; 
            },

        }
    },
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
})

//query middleware to handle deletion of review if the listing is deleted.
listingSchema.post("findOneAndDelete",async(listing)=>{
    console.log("listing from query Middleware");
    console.log(listing);
    if(listing.reviews.length){
        const listingDeleted=await Review.deleteMany({_id:{$in:listing.reviews}});
        console.log("The deleted listing from query middleware are:");
        console.log(listingDeleted);
  
    }
})

const Listing= mongoose.model("Listing",listingSchema);
module.exports={Listing,listingSchema};