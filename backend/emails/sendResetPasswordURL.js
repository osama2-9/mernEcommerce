import { sender, client } from "./mailtrap.js";

export const sendResetPasswordURL = async (user, email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 8px;">
        <div style="text-align: center;">
          <h1 style="color: #333; font-size: 24px;">Hello ${
            user?.fname + " " + user?.lname
          }</h1>
          <p style="font-size: 18px; color: #555;">You have requested to reset your password. Please click the button below to proceed:</p>
          <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">Reset Password</a>
          <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
        `,
    });
  } catch (error) {
    console.log(error);
  }
};
