import express from "express";
import { addCountryWishList, registerStudent, getStudents, logInStudent } from "../controllers/students.js";
import { checkEmailExists, authMiddleware } from "../middlewares/students.js";

export const studentsRouter = express.Router();

studentsRouter.get("/", authMiddleware, getStudents);
studentsRouter.post("/register", checkEmailExists, registerStudent);
studentsRouter.post("/login", logInStudent);
studentsRouter.post("/:id/add-country", addCountryWishList);
