const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema({
    email:{type:String, required},
    password :{type:String, required }
   })

module.exports=  mongoose.model("users",schema)