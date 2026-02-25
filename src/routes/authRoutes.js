import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

//Routes
// signup | method:post | /api/v1/auth/signup
router.post("/signup", signup);

export default router;
