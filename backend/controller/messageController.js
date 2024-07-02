import { response } from "express";
import Message from "../model/Messages.js";
import nodemailer from "nodemailer";
const newMessaeg = async (title, description, orderDetail) => {
  try {
    const message = new Message({
      messageTitle: title,
      messageDescription: description,
    });
    await message.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoponlineecommerce7@gmail.com",
        pass: "zmpp kwdp pxgz vhrz",
      },
    });

    const orderRows = orderDetail
      .map(
        (order) => `
      <tr>
        <td style="border: 1px solid #e2e8f0; padding: 8px;">
          <img src="${order.prodcutImg}" alt="${
          order.productName
        }" style="width: 50px; height: auto;"/>
        </td>
        <td style="border: 1px solid #e2e8f0; padding: 8px;">${
          order.productName
        }</td>
        <td style="border: 1px solid #e2e8f0; padding: 8px;">${
          order.quantity
        }</td>
        <td style="border: 1px solid #e2e8f0; padding: 8px;">$${(
          order.price / order.quantity
        ).toFixed(2)}</td>
        <td style="border: 1px solid #e2e8f0; padding: 8px;">$${order.price.toFixed(
          2
        )}</td>
      </tr>
    `
      )
      .join("");

    const emailTemplate = `
      <h1>${title}</h1>
      <br/>
      <p>${description}</p>
      <br/>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th colspan="5" style="border: 1px solid #e2e8f0; padding: 8px; text-align: center; background-color: #f1f5f9;">
              Order ID: ${orderDetail[0]._id}
            </th>
          </tr>
          <tr>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Product Image</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Product Name</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Quantity</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Price</th>
            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; background-color: #f1f5f9;">Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderRows}
        </tbody>
      </table>
      <br/>
      <p><strong>Ordered At:</strong> ${new Date().toLocaleString()}</p>
    `;

    var mailOptions = {
      from: "shoponlinecommerce7@gmail.com",
      to: "osamasarraj67@gmail.com",
      subject: "New email from OnlineShop",
      html: emailTemplate,
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
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      auth: {
        user: "shoponlineecommerce7@gmail.com",
        pass: "zmpp kwdp pxgz vhrz",
      },
    });

    var mailOptions = {
      from: "shoponlineecommerce7@gmail.com",
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
