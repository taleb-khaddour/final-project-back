import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Customers', 
         required: true 
        },
         
    status: { 
        type: String, 
        required: true 
    },
    total_price: {
         type: Number,
          required: true 
        },
    created_at: { 
        type: Date,
         default: Date.now 
        },
    updated_at: { 
        type: Date,
         default: Date.now 
        },
        items:[
            {
             item_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product',
                required:true,
             },
             price:{
                type:Number,
                required:true

            },
            quantity:{
                type:Number,
                required:true,
            }
            }
        ]
  });
  
  const Orders = mongoose.model('Orders', orderSchema);
 
  export default  Orders;