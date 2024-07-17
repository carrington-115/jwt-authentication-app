import { config } from "dotenv";
import express from "express";
import { authorisationToken } from "./middleware.js";
config({ path: "./.env" });

const app = express();
app.use(express.json());

app.get("/dishes", authorisationToken, (req, res) => {
  res.json({ cameroon: "Eru and water fufu", nigeria: "egusi soup and fufu" });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running: ${process.env.PORT}`);
});
