import User from "../model/User.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const auth = req.cookies.auth;
    if (!auth) {
      return res.status(404).json({
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    const user = await User.findById(decoded.uid).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export { protectRoute };
