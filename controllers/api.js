import Country from "../models/countries.js";
import { tryAndCatch } from "../utils/tryAndCatch.js";

export const getCountryLists = tryAndCatch( 
  async (req, res) => {
    const { sort, visited } = req.query;
    const findLogic = visited ? {isVisited: visited === "true" ? true : false} : {};
    const sortLogic = sort ? {name: sort === "true" ? 1 : -1} : {};

    const data = await Country
      .find(findLogic)
      .sort(sortLogic);
    res.status(200).json(data);
  }
);

export const addCountry = tryAndCatch(
  async (req, res) => {
    const { name, alpha2Code, alpha3Code} = req.body;
    const data = await Country.create({ name, alpha2Code, alpha3Code });
    res.status(201).send(data);
  }
);

export const getCountryByCode = tryAndCatch(
  async(req, res) => {
    res.json(req.country);
  }
);

export const modifyCountryByCode = tryAndCatch(
  async (req, res) => {
    const { code } = req.params;
    const data = await Country.findOneAndUpdate(
      {$or: 
        [{alpha2Code: code.toUpperCase()},
        {alpha3Code: code.toUpperCase()}]
      },
      req.body, {runValidators: true}, {new: true}
      );
      res.status(200).json(data)
  }
);

export const deleteCountryByCode = tryAndCatch(
  async (req, res) => {
    const { code } = req.params;
    // const data = await Country.findOneAndDelete(
    //   {$or: [{alpha2Code: code}, {alpha3Code: code}]}
    // );
    // res.status(202).send(data);
    const country = await Country.findOne(
      {$or: [{alpha2Code: code}, {alpha3Code: code}]}
      );
    // Toggle
    country.isVisited = !country.isVisited;
    // Save any change made
    await country.save();
    res.json({
       message: `Country ${country.isVisited ? "marked as visited" : "marked as to visit"}.`,
      country: country
     });
  }
);

