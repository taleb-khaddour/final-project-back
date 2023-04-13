import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminschema = new Schema(
  {
   
    FullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: { type: String, 
        required: true 
    },
  },
  {
    collection: "Admin",
  }
);

const adminModel = model("adminModel", adminschema);
export default adminModel;
