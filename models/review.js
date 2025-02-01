const {mongoose,Schema}=require("mongoose");

const reviewSchema=new mongoose.Schema({
    review:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1569516449771-41c89ee14ca3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    create_at:{type:Date,default:Date.now()}

});

const Review=mongoose.model("Review",reviewSchema);

module.exports=Review;