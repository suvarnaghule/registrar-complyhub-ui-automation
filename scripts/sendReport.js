/*const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// OAuth2 credentials from Google Cloud Console
const CLIENT_ID = '685045770383-hq2dq996j4o7hrp0irhbosqitlbq2hbo.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Use your redirect URI here
const SCOPES = ['https://www.googleapis.com/auth/gmail.send']; // Gmail scope for sending emails

// Create a readline interface to handle user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to generate authorization URL and get the authorization code
async function getAuthUrl() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  
  // Ask the user for the authorization code
  rl.question('Enter the authorization code: ', (code) => {
    rl.close();
    getAccessToken(code); // Call the function to exchange the code for an access token
  });
}

// Function to get the access token using the authorization code
async function getAccessToken(code) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens); // Set the credentials (access token & refresh token)
    console.log('Tokens obtained:', tokens);
    sendEmail(tokens.access_token); // Now send the email with the access token
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
}

// Function to send the email using the access token
async function sendEmail(accessToken) {
  // Create Nodemailer transporter with OAuth2 authentication
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
      type: 'OAuth2',
      user: 'ghulesuvarna@gmail.com', // Your Gmail email address
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      accessToken: accessToken, // The access token obtained from OAuth2
    },
  });

  // Path to the Mochawesome HTML report file
  const reportFile = path.join(__dirname, '..', 'cypress', 'reports', 'mochawesome-report', 'TestReport', 'index.html');

  // Define email options
  const mailOptions = {
    from: 'ghulesuvarna@gmail.com', // Sender email address
    to: 'suvarna.ghule@encora.com', // Recipient email address
    subject: 'Cypress Test Report',
    text: 'Please find attached the Cypress Mochawesome report.',
    attachments: [
      {
        filename: 'index.html',
        path: reportFile,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Start the process by getting the auth URL
getAuthUrl();  */
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// OAuth2 credentials from Google Cloud Console
const CLIENT_ID = '685045770383-hq2dq996j4o7hrp0irhbosqitlbq2hbo.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Same as in the consent flow
//const SCOPES = ['https://www.googleapis.com/auth/gmail.send']; // Gmail send permission

// The access token and refresh token you obtained

const ACCESS_TOKEN ='ya29.a0AeDClZBwS-Tj8DOFZWwxBNmmXzopoRTEgtmMhpey8OMKlFTzam-IeKT3_sslF0lfeJDBc5gGFtXbTphDY0qSbfOqGf0fs61xifsdYx6KzDQ6zsOJWyF-Zh9f-0X7dnS0xq_GdBo79xkSsBOZLAXot0fscSUeoC7DBvpXpk9YaCgYKAVYSARASFQHGX2MiL4qiGjzySPd_SJwpNT2KVQ0175';  //ya29.a0AeDClZDQeNUBEt9u9_BTdS1wMjYjdPlUq_IDWJbUJCRZVhIfZ3silJ0prdeYQK6f6G9Po5GmwHFpVFgdRJBkFcogTr4Hye7FA3eEBQAOYFx0oqyersHzatGRpKMzhOdSEZo454d_ewTk98f6DQCaXLKrcACDWYsL0Xc0VOvAaCgYKAU0SARASFQHGX2Mi-1QXbua26Z8GMHXeuEj1_A0175'; // Use the access token from the response
const REFRESH_TOKEN = '1//04-PEfODhE8ASCgYIARAAGAQSNwF-L9IrhJm50eha8a9S_t63hvbNf-ZG5yjoz2aKtfEwDb_32ePXjiaVwi40RQWWDmLcFPwXAg4'; // Use the refresh token from the response

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Set the credentials (access token and refresh token)
oAuth2Client.setCredentials({
  access_token:ACCESS_TOKEN,
  refresh_token: REFRESH_TOKEN
});

// Function to send the email using OAuth2
async function sendEmail() {
  // Create Nodemailer transporter with OAuth2 authentication
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ghulesuvarna@gmail.com', // Your Gmail address
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    },
  });

  // Path to the Mochawesome HTML report file
  const reportPath = path.join(__dirname, '..', 'cypress', 'reports', 'mochawesome-report', 'TestReport', 'index.html');
  const report = fs.readFileSync(reportPath);
  // Define email options
  const mailOptions = {
    from: 'ghulesuvarna@gmail.com', // Sender email address
    to: 'ghulesuvarna@gmail.com', // Recipient email address
    subject: 'Cypress Test Report',
    text: 'Please find attached the Cypress Mochawesome report.',
    html: report,
    attachments: [
      {
        filename: 'index.html',
        //path: reportPath,
        content: report,
        encoding: 'base64', // Optional, for safe transmission
        contentType: 'text/html' // Ensure it's recognized as an HTML file
      },
    ],
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Send the email
sendEmail(); 

