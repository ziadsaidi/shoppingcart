const passport = require('passport');
const User = require("../models/user");
const localStrategy = require("passport-local").Strategy
const { body, validationResult } = require('express-validator');
const { serializeUser,deserializeUser} = require('passport');

passport.serializeUser(function(user,done){
 
    done(null,user.id);
})


passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err,user);
    })
})


 passport.use("local.signin", new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true 
 },function(req,email,password,done){
   User.findOne({"email":email}, function(err,user){
   if(err) return done(err);

    if(!user){
        return done(null,false, 'There is no Account with this email') 
    }
  
    var isValid = user.validPassword(password);
    if(!isValid){
         return  done(null,false, 'Invalid Password Or Email') 
    }
    else {
        return  done(null,user);
    }


   })
 }));


passport.use("local.signup", new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, function(req,email,password,done){
   

    User.findOne({'email':email} , function(err,user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false, 'Email is already  in use?')
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        newUser.save(function(err,res){
            if(err) return done(err)

            return done(null, newUser);
        })

    })


}))