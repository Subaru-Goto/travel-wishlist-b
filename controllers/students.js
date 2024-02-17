import Student from "../models/students.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";
import bcrypt from "bcrypt";

const seacretToken = process.env.SEACRET_TOKEN;

const generateToken = (data) => {
  return JsonWebTokenError.sign(data, seacretToken, {expiresIn: "1h"});
};

export const getStudents = tryAndCatch(
  async (req, res, next) => {
    const data = await Student.find().populate("country");
    if (!data) {
      return next( {statusCode:404, message:"No data found."} );
    } else {
      res.status(200).json(data);
    }
  }
);

export const registerStudent = tryAndCatch(
  async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await Student.create({ first_name: firstName, last_name: lastName, email, password:hashedPassword });
    res.status(201).send(data);
  }
)

export const addCountryWishList = tryAndCatch(
  async (req, res, next) => {
    const { id } = req.params;
    const { country } = req.body;
    const data = await Student.findOneAndUpdate({ _id: id}, {country: country});
    res.status(201).send(data);
  }
);
