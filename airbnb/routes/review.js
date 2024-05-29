const express =require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js")
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

  
// post review route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview))
  
  //delete review route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyreview))

  module.exports=router;