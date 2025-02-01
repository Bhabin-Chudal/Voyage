//express and ejs
const express=require("express");



const app=express();

//requiring other relative models
const {Listing}=require("../models/listing");

//database connection And Initialization:
const mongoose=require("mongoose");
async function  main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/voyage")
}

main()
.then(()=>console.log("connected to database successfully."))
.catch(err=>console.log(err));

//intialization
const initData=require("./data");

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map(obj => ({ ...obj, owner: "6791528cfbb77440c83f7edc" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initalized");
}

initDB();