import Country from "../models/countries.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";

export const checkCountryExist = tryAndCatch(
  async (req, res, next) => {
    const { code } = req.params;
    const { alpha2Code , alpha3Code } = req.body;
    console.log(req.method.includes(["GET", "PUT", "DELETE"]))
    if(["GET", "PUT", "DELETE"].includes(req.method)) {
      console.log(`called`);
      const country = await Country.findOne({
        $or:
         [{alpha2Code: code.toUpperCase()},
          {alpha3Code: code.toUpperCase()}]
        });
        console.log(country)
      if(country){
        req.country = country;
        return next();
      } else {
        return res.status(404).json({error: "No country with the code exist."});
      }
    } else if (req.method === "POST") {
      const isCountryExist = Boolean(await Country.findOne({$or: [{alpha2Code}, {alpha3Code}]}));
      if (isCountryExist) {
          return res.status(409).send({error: "Country is already in your wishlist."});
      } else {
        return next();
      };
    }
  }
);