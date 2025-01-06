import express from 'express';
import { addApplicant, deleteApplicant, addEmployer, deleteEmployer } from '../controllers/adminControllers.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addApplicant', verifyAdmin, addApplicant);
router.delete('/deleteApplicant/:id', verifyAdmin, deleteApplicant);
router.post('/addEmployer', verifyAdmin, addEmployer);
router.delete('/deleteEmployer/:id', verifyAdmin, deleteEmployer);

export default router;
