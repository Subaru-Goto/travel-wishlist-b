import "dotenv/config";
import express from "express";
import { connectDatabase } from "./db/client.js";
import { apiRouter } from "./routes/api.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/countries", apiRouter);
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