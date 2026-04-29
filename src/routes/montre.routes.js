import express from 'express'; 
import { getMontre, createMontre, updateMontre, deleteMontre, getMontreById } from '../controllers/montre.controller.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';
import { createMontreSchema } from '../schemas/montre.schema.js';
import { authMiddleware, authorize } from '../middleware/auth.middleware.js';

const router = express.Router(); 

// Routes pour récupérer un élément 

router.get('/', getMontre); 
router.get('/:id', getMontreById); 

// Routes pour créer / modifier / supprimer des éléments 

router.post('/', authMiddleware, authorize(["admin"]), upload.single("image"),validate(createMontreSchema), createMontre); 
router.put('/:id',authMiddleware,  authorize(["admin"]), updateMontre); 
router.delete('/:id', authMiddleware, authorize(["admin"]), deleteMontre); 

export default router; 