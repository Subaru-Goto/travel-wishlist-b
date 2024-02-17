import express from "express";
import { addCountry, getCountryLists,
   getCountryByCode, modifyCountryByCode,
   deleteCountryByCode } from "../controllers/countries.js";
import { checkCountryExist } from "../middlewares/checkCountryExist.js";

export const countryRouter = express.Router();

countryRouter.get("/", getCountryLists);
countryRouter.post("/", checkCountryExist, addCountry);

countryRouter.get("/:code", checkCountryExist, getCountryByCode);
countryRouter.put("/:code", checkCountryExist, modifyCountryByCode);
countryRouter.delete("/:code", checkCountryExist, deleteCountryByCode);