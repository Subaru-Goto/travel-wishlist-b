import Student from "../models/students.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";

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