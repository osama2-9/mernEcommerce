import { response } from "express";
import Message from "../model/Messages.js";
import nodemailer from "nodemailer";

const newMessaeg = async (title, description) => {
  try {
    const message = new Message({
      messageTitle: title,
      messageDescription: description,
    });
    await message.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "osamasarraj67@gmail.com",
        pass: "ksyl ihhi cjxm sjkb",
      },
    });

    var mailOptions = {
      from: "shoponlinecommerce7@gmail.com",
      to: "osamasarraj67@gmail.com",
      subject: "new email from onlineshop",
      html: `
       <h1>${title}</h1>
       <br/>
       <p>${description} </p>

       <br/>
       <br/>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    if (messages.length === 0) {
      return res.status(400).json({
        error: "No Messagess available",
      });
    }
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};
export { newMessaeg, getAllMessages };
