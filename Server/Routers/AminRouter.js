import {AdminLogin} from '../Controllers/AdminControler.js'
import express from 'express';

const router = express.Router();

// User Registration Route
router.post("/login", AdminLogin); // Changed "/Reg" to "/register"

export default router
