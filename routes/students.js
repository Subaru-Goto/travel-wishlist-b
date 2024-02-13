import express from "express";
import { addStudent, getStudents } from "../controllers/students.js";

export const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", addStudent);
