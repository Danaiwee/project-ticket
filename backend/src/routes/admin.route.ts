import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getLocationDateBookings,
  updateLocationLimit,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, adminRoute, getLocationDateBookings);

router.put("/:id", protectRoute, adminRoute, updateLocationLimit);

export default router;
