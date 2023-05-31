
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const suggestionSchema = new mongoose.Schema({
    description:{
      type: 'string',
      required: true
    }
  });
  suggestionSchema.plugin(mongoosePaginate);
  
  const suggestion = mongoose.model('suggestion', suggestionSchema);
 
  export default  suggestion;