const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "token not found" });

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = authMiddleware;
