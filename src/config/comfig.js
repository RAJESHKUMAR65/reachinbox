export const config = {
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/auth/google/callback',
  },
  outlook: {
    clientId: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/auth/outlook/callback',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};
