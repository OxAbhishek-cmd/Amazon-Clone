const jwt = require("jsonwebtoken");
const JWT_SECRET = "ILoveJavaScript";

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add it to the req object
  const token = req.header("authtoken");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
