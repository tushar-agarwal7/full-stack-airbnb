const express =require("express");
const app=express();
// const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path")

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

//cookies
// app.use(cookieParser("secretcode"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("get some cookies");
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi i am root")
// })

// //cookies me jakr change krna 
// app.get("/greet",(req,res)=>{
// let {name="anonymous"}=req.cookies;
// res.send(`hi ${name}`);
// })

//signed cookies
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signed cookie sent");
// })
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verfied");
// })




//express-session
const sessionoption={secret:"mysupersecretstring",resave:false,saveUninitialized:true};
 app.use(session(sessionoption));
app.use(flash());
// app.get("/test",(req,res)=>{
//     res.send("test Successful");
// })


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;

//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })


app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
        req.flash("error","user not  registered")
    }
    else{
    req.flash("success","user registered successfully")
    }
    res.redirect("/hello")
})
app.get("/hello",(req,res)=>{
    res.locals.msg=req.flash("success");
    res.locals.errmsg=req.flash("error");
  res.render("page.ejs",{name:req.session.name })
})


//index-users
app.get("/users",(req,res)=>{
    res.send("get for user")
})


//show user
app.get("/users/:id",(req,res)=>{
    res.send("get for user id");
})

//post user
app.post("/users",(req,res)=>{
    res.send("post for user");

})

//delete
app.delete("/users/:id",(req,res)=>{
    res.send("Delete for user id");
})


//posts
//index
app.get("/posts",(req,res)=>{
    res.send("get for user")
})


//show user
app.get("/posts/:id",(req,res)=>{
    res.send("get for posts");
})

//post user
app.post("/posts",(req,res)=>{
    res.send("post for posts");

})

//delete
app.delete("/posts/:id",(req,res)=>{
    res.send("Delete for posts id");
})



app.listen("3000",()=>{
    console.log("server is listing to 3000")
})