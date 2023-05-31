import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;
import catergory from "./category_Model.js";
import flavour from "./flavour_Model.js";
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  size: {
    type: String,
    required: [true, "Please enter a size"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  image: {
    type: String,
    required: false,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  flavour_id: {
    type: Schema.Types.ObjectId,
    ref: "Flavour",
  },
});
subCategorySchema.plugin(mongoosePaginate);

subCategorySchema.pre(
  ["find", "findOneAndUpdate", "updateOne", "save", "create"],
  function () {
    this.populate({ path: "category_id", model: catergory });
  }
);
subCategorySchema.pre(
  ["find", "findOneAndUpdate", "updateOne", "save", "create"],
  function () {
    this.populate({ path: "flavour_id", model: flavour });
  }
);

const subCategory = mongoose.model("sub-category", subCategorySchema);
export default subCategory;
