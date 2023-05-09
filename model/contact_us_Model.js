
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contact = new Schema({ 

name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Contact = model("contact", category);
export default Contact;

