import Student from "../models/students.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
  return jwt.sign(data, secretToken, {expiresIn: "1h"});
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
    const { firstName, lastName, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await Student.create({ first_name: firstName, last_name: lastName, email, password:hashedPassword });
    res.status(201).send(data);
  }
)

export const logInStudent = tryAndCatch(
  async (req, res, next) => {
    const { email, password } = req.body;
    const student = await Student.findOne({email: email});
    if(!data) {return res.status(404).send("! User not found");}

    const validPassword = await bcrypt.compare(password, data.password);
    if(! validPassword) {return res.status(400).send("! Invalid Credential");}
    
    const token = generateToken({email: data.email, id: data._id });
    res.json({ token, student });
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
