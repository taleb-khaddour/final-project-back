import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productschema = new Schema(
  {
//    name,category, description, price, and image
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
         type:number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    category: { 
        type: number, 
        required: true 
    },
  },
  {
    collection: "product",
  }
);

const product = model("product", productschema);
export default product;
