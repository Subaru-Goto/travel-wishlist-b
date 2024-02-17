import express from "express";
import { addCountryWishList, registerStudent, getStudents, logInStudent } from "../controllers/students.js";
import { checkEmailExists } from "../middlewares/checkEmailExist.js";

export const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", checkEmailExists, registerStudent);
studentsRouter.post("/", logInStudent);
studentsRouter.post("/:id/add-country", addCountryWishList);
