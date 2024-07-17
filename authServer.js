import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

app.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(
    `The auth server is running on port: ${process.env.AUTH_SERVER_PORT}`
  );
});
