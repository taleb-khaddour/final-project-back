import express from "express";
const router = express.Router();
import controller from "../controller/category_controller.js";
import auth from "../middlewares/auth.js";


router.get("/",auth, controller.getAll);
router.post("/add",auth, controller.Add);
router.patch("/update/:id", auth,  controller.edit);
router.delete("/delete/:id",auth,  controller.Delete);
router.get("/:id", auth, controller.getById);
router.get("/name/:name",auth,  controller.getByName);


export default router;
