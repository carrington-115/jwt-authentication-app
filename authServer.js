import express from "express";
const app = express();

app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ accessToken: accessToken });
});
