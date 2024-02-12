import mongoose from "mongoose";

const Schema = mongoose.Schema;
const countrySchema = new Schema({
  name:{
    type: String,
    minLength:1,
    required: true},

  alpha2Code: {
    type: String,
    minLength: 2,
    maxLength: 2,
    match: [/[A-Z]{2}/, "Please input 2 digits country code."]
  },
  
  alpha3Code: {
    type: String,
    minLength: 3,
    maxLength: 3,
    match: [/[A-Z]{3}/, "Please input 3 digits country code."]
  },
  isVisited: {
    type: Boolean
  }
});

const Country = mongoose.model("Country", countrySchema);

export default Country;