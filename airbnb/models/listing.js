const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js");

const listingSchema = new Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
  
  },
  description: String,
  image: {
   url:String,
   filename:String,
  },
  price:Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;