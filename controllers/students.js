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
    const { name, first_name, last_name, email } = req.body;
    const data = await Student.create({ name, first_name, last_name, email });
    res.status(201).send(data);
  }
);