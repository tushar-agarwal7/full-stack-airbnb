if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
    }
    
    const express=require("express");
    const app=express();
    const mongoose=require("mongoose");
    const Listing=require("./models/listing.js")
    const path=require("path");
    const methodOverride=require("method-override");
    const ejsMate=require("ejs-mate")
    const wrapAsync=require("./utils/wrapAsync.js");
    const ExpressError=require("./utils/expressError.js");
    const {listingSchema,reviewSchema}=require("./schema.js")
    const Review=require("./models/review.js");
    const session=require("express-session")
    const flash=require("connect-flash");
    const passport=require("passport");
    const LocalStrategy=require("passport-local");
    const User=require("./models/user.js")
    
    
    const listingRouter=require("./routes/listing.js");
    const reviewRouter=require("./routes/review.js");
    const userRouter=require("./routes/user.js")
    
    main().then(()=>{
        console.log("connection successful");
    })
    
    .catch(err => console.log(err));
    
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
    }
    
    app.set("views engine","ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine("ejs",ejsMate);
    app.use(express.static(path.join(__dirname,"/public")));
    
    //express session
    const sessionoption={
      secret:"mysupersecret",
      resave:false,
      saveUninitialized:true,
      cookie:{
        expire:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
      },
    }
    
    app.use(session(sessionoption));
    app.use(flash());
    
    
    app.use(passport.initialize());
    app.use(passport.session());
    // use static authenticate method of model in LocalStrategy
    passport.use(new LocalStrategy(User.authenticate()));
    
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());// Generates a function that is used by Passport to serialize users into the session
    passport.deserializeUser(User.deserializeUser());//Generates a function that is used by Passport to deserialize users into the session
    
    
    app.use((req,res,next)=>{
      res.locals.success=req.flash("success");
      res.locals.error=req.flash("error");
      res.locals.curuser=req.user;
      next();
    })
    
    
     //search route
    app.get("/search",wrapAsync, async(req,res)=>{
      const query = req.query.q;
      const results = await Listing.find({"location" : { '$regex' : query, '$options' : 'i' }}); 
      res.render("listings/searchResults.ejs",{results})
    })
    
    app.use("/listings",listingRouter);
    app.use("/listings/:id/reviews",reviewRouter);
    app.use("/",userRouter);
    
    
    
    app.all("*",(req,res,next)=>{
      next(new ExpressError(404,"Page not found"));
    })
    //error handler
    app.use((err,req,res,next)=>{
      let {statusCode=500,message="something went wrong"}=err;
      res.render("error.ejs",{message})
      res.status(statusCode).send(message);
      res.send("something went wrong")
    })
    app.listen(8080,()=>{
        console.log("server is listening on port 8080");
    });