const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // const token = req.header("Authorization"); old
  const authHeader =
  req.header("Authorization");   ///NEW
 
  // if (!token) {                 //OLD

    if(!authHeader){              //NEW
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const token =
  authHeader.startsWith("Bearer ")
  ? authHeader.replace("Bearer ","")          //NEW
  : authHeader;



  try {

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = verified;

    next();

  } catch (err) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};