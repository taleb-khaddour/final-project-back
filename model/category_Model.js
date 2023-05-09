import mongoose from "mongoose";
const { Schema, model } = mongoose;

const category = new Schema({ 
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});
const Category = model("category", category);
export default Category;
