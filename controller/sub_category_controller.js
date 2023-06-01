import subCategory from "../model/sup_category_Model.js";
import SubCategory from "../model/sup_category_Model.js";
// import fs from "fs";
const PAGE_SIZE = 10;

const getAllSubCategories = async (req, res) => {
  try {
    // const pageNumber = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.limit) || 10;
    // const filters = {};

    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

async function getSubCategoryByName(req, res, next) {
  try {
    const name = req.params.name;
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const regex = new RegExp(name, "i");
    const filters = { name: { $regex: regex } };

    const subCategory = await SubCategory.paginate(filters, {
      page: pageNumber,
      limit: pageSize,
    });

    if (subCategory.total === 0) {
      return res
        .status(404)
        .send({ success: false, error: "Subcategory not found" });
    }

    res.status(200).send({ success: true, data: subCategory });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

async function getSubCategoryBySize(req, res, next) {
  try {
    const size = req.params.size;
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const regex = new RegExp(size, "i");
    const filters = { size: { $regex: regex } };

    const subCategory = await SubCategory.paginate(filters, {
      page: pageNumber,
      limit: pageSize,
    });

    if (!subCategory || subCategory.length === 0) {
      return res.status(404).send({
        success: false,
        error: "No subcategories found for this size",
      });
    }
    res.status(200).send({ success: true, data: subCategory });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

async function createSubCategory(req, res, next) {
  console.log("First step")
  try {
    const { name, description, price, category_id, flavour_id, size,image} =
      req.body;
      // const image = req.imagePath;
   
    const newSubCategory = new SubCategory({
      name,
      description,
      price,
      category_id,
      flavour_id,
      size,
      image,
    });
  
    const savedSubCategory = await newSubCategory.save();
    console.log("savedSubCategory", savedSubCategory);
   
    res.status(200).send({ success: true, data: savedSubCategory });
  } catch (error) {
    next(error);
  }
}
async function getSubCategoryById(req, res, next) {
  try {
    const id = req.params.id;
    const subCategory = await SubCategory.findOne({ _id: id });
    if (!subCategory) {
      return res
        .status(404)
        .send({ success: false, error: "Subcategory not found" });
    }
    res.status(200).send({ success: true, data: subCategory });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

// async function updateSubCategory(req, res, next) {
//   try {
//     const id = req.params.id;
//     const { name, price, description, category_Id, size, flavour_id, image } =
//       req.body;

//     // Check if category and flavour exist
//     // const categoryExists = await CategoryModel.exists({ _id: category_Id });
//     // if (!categoryExists) {
//     //     return res.status(400).send({ success: false, error: 'Category not found' });
//     // }
//     // const flavourExists = await FlavourMode.exists({ _id: flavour_id });
//     // if (!flavourExists) {
//     //     return res.status(400).send({ success: false, error: 'Flavour not found' });
//     // }

//     const updatedSubCategory = await SubCategory.findByIdAndUpdate(
//       id,
//       { name, price, description, category_Id, size, flavour_id, image },
//       { new: true }
//     );
//     if (!updatedSubCategory) {
//       throw new Error("Sub category not found");
//     }

//     res.status(200).send({ success: true, data: updatedSubCategory });
//   } catch (err) {
//     res.status(500).send({ success: false, error: err.message });
//   }
// }
export const updateSubCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, description, category_Id, size, flavour_id ,image} =
      req.body;
    // const image = req.imagePath;
    const editSubCategory = {
      name, 
      price,
      description,
      category_Id,
      size,
      flavour_id,
      image,
    };
    const profile = await SubCategory.findById(req.params.id);
    // if (req.imagePath) {
    //   fs.unlinkSync(profile.image);
    // }
    const updateProfile = await SubCategory.findByIdAndUpdate(
      req.params.id,

      { $set:req.body },
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    res.json({ error: error.message });
  }
};

async function Delete(req, res, next) {
  try {
    const id = req.params.id;
    console.log(id);

    const deletedCategory = await subCategory.findByIdAndRemove(id);
    if (!deletedCategory) {
      return res
        .status(404)
        .send({ success: false, message: "No matching document found." });
    }
    res.status(200).send({
      success: true,
      message: "Document deleted successfully.",
      response: deletedCategory,
    });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}
const product = {
  getAllSubCategories,
  getSubCategoryBySize,
  createSubCategory,
  updateSubCategory,
  Delete,
  getSubCategoryById,
  getSubCategoryByName,
};
export default product;
