import User from "../model/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { Address } from "../model/Address.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import { sendDeletionEmail } from "./messageController.js";
import { generateVerificationCode } from "../emails/generateVerificationCode.js";
import {
  resendVerificationCodeByAdmin,
  sendVerificationCode,
} from "../emails/sendVerificationCode.js";
import crypto from "crypto";
import { sendResetPasswordURL } from "../emails/sendResetPasswordURL.js";

const signup = async (req, res) => {
  try {
    const { fname, lname, email, password, phone } = req.body;
    const userAlreadyExsist = await User.findOne({ email });

    if (!fname || !lname || !email || !password || !phone) {
      return res.status(404).json({
        error: "Please Fill All Fields !",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be from 8 char",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (userAlreadyExsist) {
      return res.status(400).json({
        error: "User Already Signup",
      });
    }
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashPassword,
      phone,
      verificationToken: verificationCode,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await newUser.save();

    if (newUser) {
      const token = generateToken(newUser._id, res);

      const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        sameSite: "None",
      };

      res.cookie("auth", token, cookieOptions);

      const veificationCodeToken = crypto.randomBytes(30).toString("hex");

      const verificationCodeURL = `${process.env.CLIENT_URL}verify-email/${veificationCodeToken}`;
      await sendVerificationCode(
        newUser.email,
        verificationCode,
        verificationCodeURL
      );

      res.status(201).json({
        uid: newUser._id,
        phone: newUser.phone,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        address: newUser.address,
        verificationToken: newUser.verificationToken,
        verificationTokenExpiresAt: newUser.verificationTokenExpiresAt,
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
        error: "Please Fill All Fields!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "No User Found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password || "");
    if (!isPasswordMatch) {
      return res.status(404).json({
        error: "Password does not match!",
      });
    }

    const token = generateToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: "None",
    };

    res.cookie("auth", token, cookieOptions);

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      uid: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};

const verifiyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    return res.status(200).json({
      message: "Your Account Verifided Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const sendVerificationCodeByAdmin = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({
        error: "Can't send code ",
      });
    }
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    if (user.isVerified == true) {
      return res.status(400).json({
        error: "User Already Verified",
      });
    }

    const generateCode = generateVerificationCode();
    const veificationCodeToken = crypto.randomBytes(30).toString("hex");

    user.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.verificationToken = generateCode;

    const verificationCodeURL = `https://ecommerce-sigma-liard.vercel.app/verify-email/${veificationCodeToken}`;
    await user.save();
    await resendVerificationCodeByAdmin(
      user.email,
      generateCode,
      verificationCodeURL
    );
    return res.status(200).json({
      message: "Verification Code Send Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Credentials", "true");

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
    const resetPasswordToken = crypto.randomBytes(30).toString("hex");
    const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;

    findUser.resetPasswordToken = resetPasswordToken;
    findUser.resetPasswordExpiresAt = resetTokenExpiresAt;

    await findUser.save();

    const resetURL = `https://ecommerce-sigma-liard.vercel.app/reset-password/${resetPasswordToken}`;

    await sendResetPasswordURL(findUser, findUser?.email, resetURL);

    return res
      .status(200)
      .json({ message: "Reset password link sent to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired reset token",
      });
    }
    const newHashedPassword = await bcrypt.hash(password, 10);
    user.password = newHashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    return res.status(200).json({
      message: "Password updated",
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
        error: "Error while getting user data",
      });
    }

    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: uid } });
      if (emailExists) {
        return res.status(400).json({
          error: "Email is already taken by another user",
        });
      }
    }

    if (phone) {
      const phoneExists = await User.findOne({ phone, _id: { $ne: uid } });
      if (phoneExists) {
        return res.status(400).json({
          error: "Phone number is already taken by another user",
        });
      }
    }

    user.fname = fname || user.fname;
    user.lname = lname || user.lname;
    user.email = email || user.email;
    user.phone = phone || user.phone;

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
    return res.status(500).json({
      error: "Server error",
    });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({
        error: "User Id is required",
      });
    }

    const findUser = await User.findById(uid);
    if (!findUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const userOrders = await Order.find({ uid: uid });
    if (userOrders.length > 0) {
      const findUnProcessedOrders = userOrders.filter(
        (order) => order.orderStatus === "Pending"
      );

      if (findUnProcessedOrders.length > 0) {
        const productIds = findUnProcessedOrders.map((order) => order.pid);

        const getInOrderProducts = await Product.find({
          _id: { $in: productIds },
        });

        await Promise.all(
          getInOrderProducts.map(async (product) => {
            const correspondingOrders = findUnProcessedOrders.filter(
              (order) => order.pid.toString() === product._id.toString()
            );

            let totalQuantity = 0;

            correspondingOrders.forEach((order) => {
              totalQuantity += order.quantity;
            });

            product.productQuntity += totalQuantity;
            product.sells -= totalQuantity;

            await product.save();
          })
        );
      }
    }
    await User.findByIdAndDelete(uid);
    await sendDeletionEmail(userOrders);
    await Order.deleteMany({ uid: uid, orderStatus: "Pending" });

    return res.status(200).json({
      message: "User and their pending orders  have been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while deleting the user",
    });
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
  deleteUserByAdmin,
  verifiyEmail,
  sendVerificationCodeByAdmin,
};
