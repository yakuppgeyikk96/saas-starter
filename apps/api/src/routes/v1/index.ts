// V1 routes aggregator
import { Router } from "express";
import authRoutes from "./auth.routes";

const router: Router = Router();

// Mount routes
router.use("/auth", authRoutes);

export default router;
