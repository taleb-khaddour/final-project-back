import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categoryschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
},
  {
    collection: "category",
  }
);

const category = model("category", categoryschema);
export default category;
