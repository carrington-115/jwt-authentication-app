import { config } from "dotenv";
import express from "express";
const app = express();
config({ path: "./.env" });

app.listen(process.env.PORT, () => {
  console.log(`The server is running: ${process.env.PORT}`);
});
