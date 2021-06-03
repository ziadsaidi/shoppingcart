var express = require('express');
const csurf = require('csurf');
const passport = require('passport');
var router = express.Router();
const Product = require("../models/product");

const csurfProtection  = csurf();
router.use(csurfProtection);
/* GET home page. */
router.get('/',  function(req, res, next) {
  var products =   Product.find({}).then( function(prods){
    res.render('shop/index',
     { title: 'Shopping Cart' 
    , products:prods.map(p => p.toJSON())
  });
  })
  

});


// users routes..

router.get('/users/signup', function(req,res,next){
  var messages= req.flash('error');

  res.render('users/signup' ,{ csrfToken: req.csrfToken(),
    messages : messages, hasErrors : messages.length > 0
  })
})

router.post('/users/signup',passport.authenticate("local.signup", {
  successRedirect:"/users/profile",
  failureRedirect:"/users/signup",
  failureFlash: true
}));


router.get('/users/profile', function(req,res,next){
  res.render("users/profile");
})
module.exports = router;
