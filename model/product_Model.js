import mongoose from "mongoose";
const { Schema, model } = mongoose;
const productSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
     },
  description: {
     type: String 
    },
  price: {
     type: Number, 
     required: true 
    },
  image_url: {
     type: String 
    },
  category_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  size: {
    type:String,
  },
});


const Product = mongoose.model("Product", productSchema);
export default Product;
