
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const flavourSchema = new mongoose.Schema({
    name:{
      type: 'string',
      required: true
    }
  });
  flavourSchema.plugin(mongoosePaginate);
  
  const flavour = mongoose.model('flavour', flavourSchema);
 
  export default  flavour;