const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const keys = require("./config/dev")
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

// app.use('/', (req,res)=>{
//     res.send("<h1>Hello Node</h1>");
// })


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile,done)=>{
       console.log("accessToken: ", accessToken);
       console.log("refreshToken: ", refreshToken);
       console.log("profile: ", profile);
       console.log("done: ", done);
      })
)

app.get('/auth/google',passport.authenticate('google',{
    scope:['profile' , 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

app.listen(PORT,()=>{
    console.log(`Server listining on ${PORT}...!`)
})