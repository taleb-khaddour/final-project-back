import jwt from "jsonwebtoken";

const authen = (req, res, next) => {
  let token;
  token = req.cookies["auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
export default authen;
