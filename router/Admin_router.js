import express from "express";
const router = express.Router();
import controller from "../controller/Admin_controller.js";
import auth from "../middlewares/auth.js";

router.post("/login", controller.login);
router.post("/register", controller.createAdmin);

router.get("/", controller.getAll);
router.patch("/update/:id",auth, controller.edit);
router.delete("/delete/:id",auth, controller.Delete);
router.get("/:id",auth,  controller.getById);
router.delete("/delete/ok",controller.deleteAll);





export default router;
