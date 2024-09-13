import jwt from "jsonwebtoken";
import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Credentials", "true");

    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({
        error: "Can't access this page",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.cookie("auth", "", { expires: new Date(0), httpOnly: true });
      return res.status(401).json({
        error: "Can't access this page",
      });
    }

    const user = await User.findById(decoded.uid);
    if (!user) {
      res.cookie("auth", "", { expires: new Date(0), httpOnly: true });
      return res.status(404).json({
        error: "No user found",
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isAdmin:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { isAdmin };
