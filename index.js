import "dotenv/config";
import express from "express";
import { connectDatabase } from "./db/client.js";
import { countryRouter } from "./routes/countries.js";
import { studentsRouter } from "./routes/students.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/countries", countryRouter);
app.use("/api/students", studentsRouter);
app.use(errorHandler);


const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });
};

startServer().catch(error => {
  console.log("Failed to start server...", error.message);
})