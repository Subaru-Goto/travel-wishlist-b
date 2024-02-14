import Student from "../models/students.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";

export const getStudents = tryAndCatch(
  async (req, res, next) => {
    const data = await Student.find();
    if (!data) {
      return next( {statusCode:404, message:"No data found."} );
    } else {
      res.status(200).json(data);
    }
  }
);

export const addStudent = tryAndCatch(
  async (req, res, next) => {
    const { first_name, last_name, email, country } = req.body;
    const data = await Student.create({ first_name, last_name, email, country });
    res.status(201).send(data);
  }
);