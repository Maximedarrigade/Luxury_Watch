import express from "express";
import { validate } from "../middleware/validate.js";
import { getUser, register, updateUser, getUserById, deleteUser, login, logout, verifyEmail } from "../controllers/auth.controller.js";
import { registerSchema } from "../schemas/auth.schema.js";
import { validateLogin, validateRegister } from "../middleware/validation.middleware.js";

const router = express.Router(); 

// Routes pour récupérer des utilisateurs 

router.get("/", getUser); 
router.get("/verify", verifyEmail);  
router.get("/:id", getUserById);

// Routes pour créer / modifier / supprimer des utilisateurs 

router.post("/register", validateRegister, register); 
router.post("/login",validateLogin, login); 
router.post("/logout", logout);
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

export default router; 