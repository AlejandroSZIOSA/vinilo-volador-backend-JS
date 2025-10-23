//1
import express from "express";
//2 importing
import { getVinyls } from "../controller/vinyls.js";

//1
const router = express.Router();

//3
router.get("/vinyls", getVinyls);

export default router;
