import express from "express";
import { login, register, logout, getUser,getJobSeeker,deleteUser ,getEmployer} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getJobSeeker", getJobSeeker);
router.get("/getEmployer", getEmployer);
router.delete("/deleteUser/:id", deleteUser);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;
