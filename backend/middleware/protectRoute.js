import User from "../model/User.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const auth = req.cookies.auth;
    if (!auth) {
      return res.status(401).json({ error: "Unauthorized, no token" });
    }

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    const user = await User.findById(decoded.uid).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { protectRoute };
