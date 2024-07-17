import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authorisationToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const authToken = tokenHeader && tokenHeader.split(" ")[1];
  console.log(authToken);
  if (authToken === null) {
    return res.sendStatus(401);
  }

  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export { authorisationToken };
