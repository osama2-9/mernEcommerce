import { client, sender } from "./mailtrap.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationCode = async (email, verificationCode ,verificationURL) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Please Verify Your Email",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #1f2937; font-size: 24px;">Hello,</h1>
          <p style="font-size: 18px; color: #4b5563;">Please use the code below to verify your email address:</p>
        </div>
        <div style="background-color: #e5e7eb; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <p style="font-size: 32px; font-weight: bold; color: #1f2937;">${verificationCode}</p>
        </div>
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #4b5563;">Click the link below to verify your email:</p>
          <a href="${verificationURL}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; font-size: 16px; color: white; background-color: #3b82f6; border-radius: 5px; text-decoration: none;">Verify Email</a>
        </div>
      </div>
      `,
    });
    console.log("Email sent ", response);
  } catch (error) {
    console.log(error);
  }
};
