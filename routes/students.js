import express from "express";
import { addCountryWishList, registerStudent, getStudents } from "../controllers/students.js";

export const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", registerStudent);
studentsRouter.post("/:id/add-country", addCountryWishList);
studentsRouter.post("/login", loginStudent);
