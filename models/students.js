import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 1,
  },
  first_name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 1,
  },
  email: {
    type: String,
    lowercase: true,
    validate: {
      validator: email => new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$").test(email),
      message: "Please input an email!"
    },
  }
}); 

const Student = mongoose.model("Student", StudentSchema);

export default Student;