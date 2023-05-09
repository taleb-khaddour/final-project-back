import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  registre_at: { type: Date },
});

const customers = mongoose.model("Customers", userSchema);
export default customers;
