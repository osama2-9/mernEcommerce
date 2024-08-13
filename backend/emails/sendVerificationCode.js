import { client, sender } from "./mailtrap.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationCode = async (
  email,
  verificationCode,
  verificationURL
) => {
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
export const resendVerificationCodeByAdmin = async (
  email,
  verificationCode,
  verificationURL
) => {
  const recipient = [{ email }];
  try {
    const response = client.send({
      from: sender,
      to: recipient,
      subject: "Email Verification Required",
      html: `
        <div style="background-color: #f9fafb; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333; text-align: center; font-size: 24px; font-weight: bold;">Verify Your Email Address</h2>
            <p style="color: #555555; text-align: center; font-size: 16px; margin-top: 20px;">You have not yet verified your email address. Please verify your email </p>
            <p style="color: #555555; text-align: center; font-size: 16px; margin-top: 10px;">Your verification code is:</p>
            <p style="text-align: center; font-size: 24px; color: #3b82f6; font-weight: bold; margin-top: 10px;">${verificationCode}</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${verificationURL}" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-size: 16px;">Verify Email</a>
            </p>
            <p style="color: #777777; text-align: center; font-size: 14px; margin-top: 30px;">e-commerce</p>
          </div>
        </div>
      `,
    });

    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};
