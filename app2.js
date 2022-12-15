
const { ObjectID } = require('bson');
const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/student')
const ProductSchema=new mongoose.Schema({
    name:String

});
const main= async()=>{
    await mongoose.connect('mongodb://localhost:27017/student')
    const ProductSchema=new mongoose.Schema({
        name:String

    });
    const ProductModel=mongoose.model('products',ProductSchema);
    let data=new ProductModel({name:"Gauri"});
     data.save().then((result)=>{
        console.log(result);
     });
    console.log(result)
}
//  main()
const updateDb= async() =>{
    const Product=mongoose.model('products',ProductSchema);
    let value=await Product.updateOne(
        { _id:ObjectID("6399ac70f6eabc497b8200b3")},
        {
            $set:{name:"Suman Pandey"}
        }
        )
        console.log(value)
}
//  updateDb()
 deleteValue= async ()=>{
    const Product=mongoose.model('products',ProductSchema);
    let value=await Product.deleteOne({name:"Garima"})
    console.log(value);
 }
//  deleteValue();
 findValue= async ()=>{
    const Product=mongoose.model('products',ProductSchema);
    let value=await Product.find()
    console.log(value);
 }
findValue();
