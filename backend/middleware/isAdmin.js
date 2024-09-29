import jwt from "jsonwebtoken";
import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, no token" });
    }

    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.uid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isAdmin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { isAdmin };
