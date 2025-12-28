import express from "express";
import {
  getLoggedInUser,
  logout,
  signIn,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-user", protectRoute, getLoggedInUser);

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/logout", logout);

export default router;
