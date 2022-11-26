const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return 
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (error) {
    req.isAuth = false;
    return 
  }

  if (!decodedToken) {
    req.isAuth = false;
    return 
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  
};
