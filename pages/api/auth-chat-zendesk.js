const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    const payload = {
      name: name,
      email: email,
      exp: Math.floor(new Date().getTime() / 1000.0) + 30, // This in seconds
      external_id: email,
      scope: 'user',
      email_verified: true
    };

    const token = jwt.sign(payload, process.env.ZD_MESSAGING_SECRET, {
      header: { kid: process.env.ZD_MESSAGING_APP_ID }
    });

    return res.status(200).json(token);
  } else {
    return res.status(400).json('Not Supported');
  }
}
