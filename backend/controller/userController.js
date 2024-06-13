import User from "../model/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { Address } from "../model/Address.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const signup = async (req, res) => {
  try {
    const { fname, lname, email, password, phone } = req.body;
    const userAlreadyExsist = await User.findOne({ email });

    if (!fname || !lname || !email || !password || !phone) {
      return res.status(404).json({
        error: "Please Fill All Fields !",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (userAlreadyExsist) {
      return res.status(400).json({
        error: "User Already Signup",
      });
    }

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashPassword,
      phone,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        uid: newUser._id,
        phone: newUser.phone,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } else {
      return res.status(404).json({
        error: "Invaild User Data",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        error: "Please Fill All Fields !",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "No User Found",
      });
    }
    const hashedPasswordCompare = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!hashedPasswordCompare) {
      return res.status(404).json({
        error: "Password not Match !",
      });
    }

    if (!user || !hashedPasswordCompare) {
      return res.status(404).json({
        error: "Invaild Email or Password",
      });
    }

    generateToken(user._id, res);
    res.status(200).json({
      uid: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,

      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("auth", "", {
      maxAge: 1,
    });
    res.status(200).json({
      message: "User Logout",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({
        error: "no users found",
      });
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    const user = await User.findById(uid).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const {
      uid,
      addressName,
      country,
      city,
      street,
      apartmentFloor,
      apartmentNumber,
    } = req.body;

    if (!uid || !addressName || !country || !city || !street) {
      return res.status(400).json({
        error:
          "Missing required fields: address name, country, city, or street",
      });
    }

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    const address = {
      uid: user._id,
      addressName: addressName,
      country: country,
      city: city,
      street: street,
      floor: apartmentFloor,
      apartment: apartmentNumber,
    };

    user.address = address;
    await user.save();

    return res.status(201).json({
      message: "New address added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while adding the address",
    });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(404).json({
        error: "no user found",
      });
    }
    const userAddress = await Address.find({ uid: uid });
    res.status(200).json(userAddress);
  } catch (error) {
    console.log(error);
  }
};

const addPayment = async (req, res) => {
  try {
    const { uid, paymentmethod } = req.body;
    if (!uid) {
      return res.status(404).json({
        error: "no user found",
      });
    }
    if (!paymentmethod) {
      return res.status(400).json({
        error: "Please select a payment method",
      });
    }

    const findUserToAddPayment = await User.findById(uid);
    if (!findUserToAddPayment) {
      return res.status(404).json({
        error: "no user found",
      });
    }

    findUserToAddPayment._id = uid || null;
    findUserToAddPayment.paymentmethod = paymentmethod || null;

    await findUserToAddPayment.save();
    return res.status(200).json({
      message: "Payment method addedd",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    const findAndDelete = await User.findByIdAndDelete(uid);
    if (findAndDelete) {
      return res.status(200).json({
        error: "User deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({
        error: "No user found with this email",
      });
    }
    const token = jwt.sign({ uid: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 30,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "osamasarraj67@gmail.com",
        pass: "ksyl ihhi cjxm sjkb",
      },
    });

    var mailOptions = {
      from: "osamasarraj67@gmail.com",
      to: findUser.email,
      subject: "Reset your password",
      text: ` 
      Follow This Link To Reset Your Password  

      http://localhost:3000/reset-password/${findUser._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Failed to send email",
        });
      } else {
        return res.status(200).json({
          message: "Email sent successfully!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { uid, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: "Invalid or expired token",
        });
      } else {
        const newPasswordHash = await bcrypt.hash(password, 10);

        const user = await User.findById(uid);

        if (!user) {
          return res.status(404).json({
            error: "No user found",
          });
        }

        user.password = newPasswordHash;
        await user.save();

        return res.status(201).json({
          message: "Password updated successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "An error occurred while updating the password. Please try again later.",
    });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { uid, fname, lname, email, phone } = req.body;
    if (!uid) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        error: "Error while get user data",
      });
    }

    user.fname = fname || user.fname;
    user.lname = lname || user.lname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.isAdmin = user.isAdmin;

    await user.save();
    user.password = null;
    return res.status(200).json({
      uid: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  signup,
  login,
  logout,
  getAllUsers,
  getUserById,
  addAddress,
  addPayment,
  getUserAddress,
  deleteUser,
  forgetPassword,
  resetPassword,
  updateUserData,
};
