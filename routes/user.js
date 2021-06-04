var express = require('express');
const passport = require('passport');
var router = express.Router();

const { check, validationResult} = require('express-validator');


router.get('/profile',requireAuth, function(req,res,next){
    res.render("users/profile");
  })


// router.use('/',SurpassAuth,function(req,res,next){
//     next();
// })

router.get('/signup', function(req,res,next){
    var messages= req.flash('error');
  
    res.render('users/signup' ,{ 
      csrfToken:req.csrfToken(),
      messages : messages, hasErrors : messages.length > 0
    })
  })
  
  router.post('/signup',
  [check('email').isEmail().withMessage("A valid email is required")], 
  [check('password').notEmpty().isLength({ min: 5 }).withMessage("Password is invalid ")], 
  [check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
  
    // Indicates the success of this synchronous custom validator
    return true;
  })],
  (req, res, next) => {
    // Check validation.
    const errorsResult = validationResult(req);
     var  { errors }  = errorsResult;
  
     var errorsMsg = [];
  
     if(errors.length > 0){
       errors.forEach(e => errorsMsg.push(e.msg));
     }
    
    
    
    if (!errorsResult.isEmpty()) {
     return  res.render('users/signup',{
        csrfToken:req.csrfToken(),
        messages :errorsMsg, hasErrors :errorsMsg.length > 0
      })
    }
    // if validation is successful, call next() to go on with passport authentication.
    next();
  },
  passport.authenticate("local.signup", {
    successRedirect:"/users/profile",
    failureRedirect:"/users/signup",
    failureFlash: true
  }));
  
  
  router.post('/signin',
  [check('email').isEmail().withMessage("A valid email is required")], 
  [check('password').notEmpty().withMessage("Password is required ")], 
  (req, res, next) => {
    // Check validation.
    const errorsResult = validationResult(req);
     var  { errors }  = errorsResult;
  
     var errorsMsg = [];
  
     if(errors.length > 0){
       errors.forEach(e => errorsMsg.push(e.msg));
     }
    
    
    
    if (!errorsResult.isEmpty()) {
     return  res.render('users/signin',{
        csrfToken:req.csrfToken(),
        messages :errorsMsg, hasErrors :errorsMsg.length > 0
      })
    }
    // if validation is successful, call next() to go on with passport authentication.
    next();
  },
  passport.authenticate("local.signin", {
    successRedirect:"/users/profile",
    failureRedirect:"/users/signin",
    failureFlash: true
  }));
  
  
  router.get('/signin', function(req,res,next){
    var messages= req.flash('error');
  
    res.render('users/signin',{
      csrfToken:req.csrfToken(),
      messages : messages, hasErrors : messages.length > 0
    })
  })
  
  
  


  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


//   function SurpassAuth (req,res,next){
//     if(!req.isAuthenticated()){
//         next();
//     }
//     else{
       
//         res.redirect('/');
//     }
 
//   }

  function requireAuth(req,res,next){
      if(req.isAuthenticated()){
          next();
      }
      else {
          res.redirect('/');
      }
  }

  module.exports = router;
  

