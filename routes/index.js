var express = require('express');
const passport = require('passport');
var router = express.Router();
const Product = require("../models/product");



/* GET home page. */
router.get('/',  function(req, res, next) {
  var products =   Product.find({}).then( function(prods){
    res.render('shop/index',
     { title: 'Shopping Cart' 
    , products:prods.map(p => p.toJSON())
  });
  })
  

});



module.exports = router;

