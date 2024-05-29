const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")

const listingController=require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage });


//index route
router.get("/",wrapAsync(listingController.index))
 
 
 //new route(ye show route se phle likhna pdega h kyuki new ko ye id smjh rha h)
 router.get("/new",isLoggedIn,listingController.renderNewform)
 
 //show route 
 router.get("/:id",wrapAsync(listingController.showlisting));
 
  //  //create route 
   router.post("/",isLoggedIn,validateListing, upload.single("listing[image]"), wrapAsync,(listingController.createlisting));

   //edit route
   router.get("/:id/edit", isLoggedIn,isOwner ,wrapAsync(listingController.editlisting));
 
   //update route
   router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing ,wrapAsync(listingController.updatelisting));
 
 //delete route
 router.delete("/:id", isLoggedIn,isOwner ,wrapAsync(listingController.destroylisting));

 //search route
//  router.get("/search",wrapAsync, async(req,res)=>{
//   const query = req.query.q;
//   const results = await Listing.find({"title": { '$regex': query, '$options': 'i' }});
//   res.render("listings/searchResults.ejs",{results})
// })

 module.exports=router;