import jwt from "jsonwebtoken";

const generateToken = (uid) => {
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
console.log(process.env.JWT_SECRET);

export { generateToken };
