import express from "express";
const router = express.Router();
import controller from "../controller/sub_category_controller.js";
import imagehandler from "../middlewares/images.js";
import auth from "../middlewares/jwtAuthenticationMiddleware.js";

router.get("/", controller.getAllSubCategories);
router.post("/",  controller.createSubCategory);
router.patch("/:id", controller.updateSubCategory);
router.delete("/:id", controller.Delete);
router.get("/:id", controller.getSubCategoryById);
router.get("/name/:name", controller.getSubCategoryByName);
router.get("/size/:size", controller.getSubCategoryBySize);


export default router;
