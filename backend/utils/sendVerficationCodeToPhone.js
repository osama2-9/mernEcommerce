import fs from "fs";
import pkg from "follow-redirects";
import { randomBytes } from "crypto";

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const generateToken = () => {
  return randomBytes(30).toString("hex");
};
const sendVerificationCodeToPhone = (
  phoneNumber,
  verificationCode,
  pageUrl
) => {
  const message = `Your verification code is ${verificationCode}. \n follow this link to verifiy: ${pageUrl}`;

  const options = {
    method: "POST",
    hostname: "3g994v.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization: `App ${process.env.SMS_API}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  const reqBody = JSON.stringify({
    messages: [
      {
        destinations: [{ to: phoneNumber }],
        from: "ServiceSMS",
        text: message,
      },
    ],
  });

  const req = pkg.https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(`Response: ${data}`);
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(reqBody);
  req.end();
};

export { sendVerificationCodeToPhone, generateVerificationCode, generateToken };
