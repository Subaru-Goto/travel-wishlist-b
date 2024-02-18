import express from "express";
import { addCountry, getCountryLists,
   getCountryByCode, modifyCountryByCode,
   deleteCountryByCode } from "../controllers/countries.js";
import { checkCountryExist } from "../middlewares/checkCountryExist.js";
import { authMiddleware } from "../middlewares/students.js";

export const countryRouter = express.Router();

countryRouter.get("/", authMiddleWare, getCountryLists);
countryRouter.get("/:code", checkCountryExist, getCountryByCode);

countryRouter.post("/", checkCountryExist, addCountry);

countryRouter.put("/:code", checkCountryExist, modifyCountryByCode);
countryRouter.delete("/:code", checkCountryExist, deleteCountryByCode);