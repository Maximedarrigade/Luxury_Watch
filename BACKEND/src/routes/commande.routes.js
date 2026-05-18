import express from "express";
import { createCommande, getCommandes, updateStatutCommande, getMesCommandes } from "../controllers/commande.controller.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCommande);
router.get("/", authMiddleware, authorize(["admin"]), getCommandes);
router.get("/mes-commandes", authMiddleware, getMesCommandes);
router.put("/:id", authMiddleware, authorize(["admin"]), updateStatutCommande);

export default router;