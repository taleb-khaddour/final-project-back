import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number, 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    },
    category_id: { 
      type: Schema.Types.ObjectId, 
      ref: "category"
    },
  },
  {
    collection: "product",
  }
);

// Use a middleware to automatically populate the "category_id" field with the corresponding category document.
productSchema.pre(['find','findOne'], async function() {
  await this.populate('category_id').execPopulate();
});

const Product = model("product", productSchema);
export default Product;
