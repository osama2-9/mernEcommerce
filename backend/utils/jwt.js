import jwt from "jsonwebtoken";

const generateToken = (uid, res) => {
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: "strict",
    });

    return token;
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export { generateToken };
