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
const sendDeletionEmail = async (deletedOrders) => {
  try {
    const ordersTable = `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Product Name</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Order ID</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Product ID</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${deletedOrders
            .map(
              (order) => `
            <tr>
              <td style="border: 1px solid #e2e8f0; padding: 8px;">${order.productName}</td>
              <td style="border: 1px solid #e2e8f0; padding: 8px;">${order._id}</td>
              <td style="border: 1px solid #e2e8f0; padding: 8px;">${order.pid}</td>
              <td style="border: 1px solid #e2e8f0; padding: 8px;">${order.quantity}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <br/>
      <h1>Your Account has been Deleted, Goodbye 👋</h1>
    `;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "osamasarraj67@gmail.com",
        pass: "ksyl ihhi cjxm sjkb",
      },
    });

    var mailOptions = {
      from: "osamasarraj67@gmail.com",
      to: deletedOrders[0].email,
      subject: "User Deletion Notification",
      html: `
        <h1>User Deletion Notification</h1>
        <br/>
        <p>The following orders have been deleted:</p>
        ${ordersTable}
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

export { newMessaeg, getAllMessages, sendDeletionEmail };
