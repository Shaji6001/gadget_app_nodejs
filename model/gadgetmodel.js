var mongoose=require("mongoose");


var brandSchema= new mongoose.Schema(
    {
        Brand:{type:String},
        ModelName:{type:String},
        Sellingprice:{type:String},
        MRP:{type:String}
    }
)
var brandModel= mongoose.model('brands',brandSchema);

module.exports={brandModel}