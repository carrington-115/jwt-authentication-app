import { config } from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
config({ path: "./.env" });

const app = express();
app.use(express.json());

const authorisationToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const authToken = tokenHeader && tokenHeader.split(" ")[1];
  if (authToken === null) {
    return res.status(401).send("Access denied: unauthorised user");
  }

  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/dishes", authorisationToken, (req, res) => {});

app.get("/login", (req, res) => {
  const { username } = req.body;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ accessToken: accessToken });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running: ${process.env.PORT}`);
});
