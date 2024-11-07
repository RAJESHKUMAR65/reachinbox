const express=require('express');
import { GmailAuth } from './auth/gmailauth';
import { OutlookAuth } from './auth/outlookauth';
import { emailQueue } from './queue/emailqueue';
import path from 'path';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const gmailAuth = new GmailAuth();
const outlookAuth = new OutlookAuth();

app.get('/auth/google', (req, res) => {
  const authUrl = gmailAuth.getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/outlook', (req, res) => {
  const authUrl = outlookAuth.getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const tokens = await gmailAuth.getTokens(code);
  // Store tokens securely and setup email watching
  res.send('Gmail account connected successfully!');
});

app.get('/auth/outlook/callback', async (req, res) => {
  const { code } = req.query;
  const tokens = await outlookAuth.getTokens(code);
  // Store tokens securely and setup email watching
  res.send('Outlook account connected successfully!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
