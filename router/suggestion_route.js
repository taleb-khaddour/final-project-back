import express from "express";
import {
  createSuggestion,
  getSuggestions,
  getSuggestionById,
  updateSuggestion,
  deleteSuggestion,
  deleteAllSuggestions
} from "../controller/suggestion_controller.js";

const router = express.Router();

router.post("/", createSuggestion);
router.get("/", getSuggestions);
router.get("/:id", getSuggestionById);
router.put("/:id", updateSuggestion);
router.delete("/:id", deleteSuggestion);
router.delete("/all", deleteAllSuggestions);

export default router;
