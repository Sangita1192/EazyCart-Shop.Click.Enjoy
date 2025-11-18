import express from "express";
import { dashboardStats } from "../../controllers/Admin/dashboardStatController.js";


export const dashboardStatsRouter = express();

dashboardStatsRouter.get('/', dashboardStats);