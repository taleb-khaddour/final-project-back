import express from "express";
const router = express.Router();
import controller from "../controller/category_controller.js";


router.get("/", controller.getAll);
router.post("/add",controller.Add);
router.patch("/update/:id",  controller.edit);
router.delete("/delete/:id", controller.Delete);
router.get("/:id", controller.getById);
router.get("/name/:name", controller.getByName);


export default router;
