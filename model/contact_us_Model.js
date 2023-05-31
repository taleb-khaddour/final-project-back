import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "please enter a valid email address"],
  },
  subject: {
    type: String,
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

const Contact = model("Contact", contactSchema);
export default Contact;
