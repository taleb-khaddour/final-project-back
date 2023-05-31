import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updatePassword,
  getUser,
  updateUsers,
  login,
} from "../controller/userController.js";
import auth from "../middlewares/jwtAuthenticationMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/", getUsers);
router.get("/user/:id", getUser);
router.post("/", createUser);

router.delete("/:id", deleteUser);

router.patch("/profile", updatePassword);
// router.patch("/", updateUser);
router.patch("/:id", updateUsers);

export default router;
