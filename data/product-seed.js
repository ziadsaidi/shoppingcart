
const Product = require("../models/product");
const mongoose = require("mongoose");


    mongoose.connect("mongodb://localhost:27017/Shopping");
    console.log("Connected To MongoDB");

   

const products = [ new Product({
    imgPath:"https://techsslash.com/wp-content/uploads/2020/10/Manga.jpg",
    title:"Anime 1",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi facere perspiciatis atque esse voluptate amet, suscipit neque. Asperiores facere fugiat ad animi fuga aut. Magni quia natus voluptatem assumenda eius.",
    price:14
}),
new Product({imgPath:"https://dw9to29mmj727.cloudfront.net/properties/2016/371-SeriesThumbnails_MHA__400x320.jpg",
title:"Anime 2",
description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo aspernatur consequuntur impedit. Corporis vitae dolor vero praesentium nesciunt facere laboriosam reprehenderit quisquam culpa qui. Porro temporibus placeat possimus quibusdam molestiae!",
price:7
}),
new Product({imgPath:"https://static.cnews.fr/sites/default/files/demon-slayer-manga_5d7b879f39262_0.jpg",
title:"Anime 3",
description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quae, eaque magni quo consectetur aperiam cum ad nulla totam incidunt labore enim, earum deleniti quaerat aliquid ab ullam voluptas ratione.",
price:19
}),
new Product({imgPath:"https://breakforbuzz.com/wp-content/uploads/2020/07/anim%C3%A9s-et-manga.jpg",
title:"Anime 4",
description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nobis deleniti maiores accusamus veritatis? Ipsum corporis enim cum, minima eum at ullam repellendus corrupti, minus consectetur a cumque reprehenderit. Numquam!",
price:24
}),

]

var done = 0;
for( var i=0; i<products.length;i++ ){
    products[i].save(function(err,res){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
