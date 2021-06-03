const passport = require('passport');
const User = require("../models/user");
const localStrategy = require("passport-local").Strategy

passport.serializeUser(function(user,done){
 
    done(null,user.id);
})


passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err,user);
    })
})

passport.use("local.signup", new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, function(req,email,password,done){

    console.log(email);
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