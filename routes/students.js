import express from "express";
import { addStudents, getStudents } from "../controllers/students.js";

export const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", addStudents);
