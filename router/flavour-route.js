import express from "express";
import {
  createFlavour,
  getFlavourById,
  getFlavourByName,
  getFlavours,
  updateFlavour,
  deleteFlavour,
} from "../controller/flavour_controller.js";

const router = express.Router();

// Create a new flavor
router.post("/", createFlavour);

// Get all flavors with pagination
router.get("/", getFlavours);

// Get a flavor by ID
router.get("/:id", getFlavourById);

// Get a flavor by name
router.get("/name/:name", getFlavourByName);

// Update a flavor by ID
router.put("/:id", updateFlavour);

// Delete a flavor by ID
router.delete("/:id", deleteFlavour);

export default router;
