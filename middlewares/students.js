import Student from "../models/students.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";
import jwt from 'jsonwebtoken';

export const checkEmailExists = tryAndCatch(
  async (req, res, next) => {
    const { email } = req.body;
    const student = await Student.findOne({email: email});

    if(student){
      return res.status(404).json({error: "This email has already been registered."});
      } else {
        return next();
      }
  }
);

export const authMiddleware = (req, res, next) => {
    const secretToken = process.env.SECRET_TOKEN;
    const authHeader = req.headers.authorization;

    if(!authHeader){return res.sendStatus(401);}

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, secretToken, (err, student) => {
     if(err){
        return res.sendStatus(403);
     }
     console.log(student, 'token decoded');
     req.student = student;
     return next()
    })
 }