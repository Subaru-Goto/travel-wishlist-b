import express from "express";
import { addCountry, getCountryLists,
   getCountryByCode, modifyCountryByCode,
   deleteCountryByCode } from "../controllers/api.js";
import { checkCountryExist } from "../middlewares/checkCountryExist.js";

export const apiRouter = express.Router();

apiRouter.get("/", getCountryLists);
apiRouter.post("/", checkCountryExist, addCountry);

apiRouter.get("/:code", checkCountryExist, getCountryByCode);
apiRouter.put("/:code", checkCountryExist, modifyCountryByCode);
apiRouter.delete("/:code", checkCountryExist, deleteCountryByCode);