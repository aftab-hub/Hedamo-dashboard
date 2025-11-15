// routes/dashboardRoutes.js
import express from "express";
const router = express.Router();
import {getStats} from "../controllers/dashboardController.js";


// GET /api/dashboard/stats
router.get("/stats", getStats);

export default router;
