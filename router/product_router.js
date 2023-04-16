import express from "express";
const router = express.Router();
import controller from "../controller/product_controller.js";
import imagehandler from "../middlewares/images.js";
import auth from "../middlewares/auth.js";


router.get("/",auth,controller.getAll);
router.post("/add",imagehandler,auth,controller.createAdmin);
router.patch("/update/:id",auth,controller.edit);
router.delete("/delete/:id", auth, controller.Delete);
router.get("/:id",auth,   controller.getById);
router.get("/name/:name",auth,  controller.getByName);


export default router;