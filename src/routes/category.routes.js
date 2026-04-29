import express from "express"; 
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from "../controllers/category.controller.js";
import { validate } from "../middleware/validate.js";
import { createCategorySchema } from "../schemas/category.schema.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";


const router = express.Router()

// Routes pour récupérer un élément

router.get('/', getCategories); 
router.get('/:id', getCategoryById); 

// Routes pour créer / modifier / supprimer des éléments 

router.post('/', authMiddleware, authorize(["admin"]), validate(createCategorySchema), createCategory); 
router.put('/:id', authMiddleware, authorize(["admin"]), updateCategory); 
router.delete('/:id', authMiddleware, authorize(["admin"]), deleteCategory); 

export default router; 



