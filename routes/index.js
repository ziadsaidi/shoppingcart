var express = require('express');
const csurf = require('csurf');
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

router.get("/users/signup", function(req,res,next){

  res.render("users/signup" ,{ csrfToken: req.csrfToken()})
})

module.exports = router;
