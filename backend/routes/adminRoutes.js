import express from 'express';
import { addApplicant, deleteApplicant, addEmployer, deleteEmployer,getallApplicants } from '../controllers/adminControllers.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addApplicant', addApplicant);
router.delete('/deleteApplicant/:id',  deleteApplicant);
router.post('/addEmployer', addEmployer);
router.delete('/deleteEmployer/:id', deleteEmployer);
router.get("/getallApplicants",  getallApplicants);

export default router;
