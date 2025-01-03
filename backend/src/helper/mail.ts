import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
const OAuth2 = google.auth.OAuth2;

const ClientId = process.env.GOOGLE_CLIENT;
const ClientSecret = process.env.GOOGLE_SECRET;
const RefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const Account = process.env.GOOGLE_MAIL_ACCOUNT;

// create OAuth2 client
export const handleSendMail = async (to: string, subject: string, content: string) => {
  return await new Promise((resolve, reject) => {
    // content required
    if (!to || !subject || !content) {
      reject(new Error('內容不可為空'));
    }

    const oauth2Client = new OAuth2(
      ClientId,
      ClientSecret,
      'https://developers.google.com/oauthplayground'
    );

    // set refresh token
    oauth2Client.setCredentials({
      refresh_token: RefreshToken
    });
    
    // get access token using promise
    oauth2Client
      .getAccessToken()
      .then((res) => {
        const accessToken = res.token;
        if (!accessToken) {
          reject(new Error('Cant get OAuth Access Token'));
        }

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: Account,
            clientId: ClientId,
            clientSecret: ClientSecret,
            refreshToken: RefreshToken,
            accessToken: accessToken ?? ''
          }
        });

        // create mail options
        const mailOptions = {
          from: Account,
          to,
          subject,
          html: content
        };

        // send mail
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          }
          resolve({ message: 'success' });
        });
      })
      .catch(() => {
        reject(new Error('Cant get OAuth Access Token'));
      });
  });
};