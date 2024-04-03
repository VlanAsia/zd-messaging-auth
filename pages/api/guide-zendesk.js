import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
const jwt = require('jwt-simple');
const uuid = require('uuid');

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const shared_key = process.env.ZD_GUIDE_SECRET;
    const user = {
      iat: Math.floor(new Date().getTime() / 1000),
      jti: uuid.v4(),
      name: 'Smith (Example User)',
      email: 'smith@na.com'
    };

    const zdToken = jwt.encode(user, shared_key);
    //console.log('ZDTOKEN', zdToken);
    return res.status(200).json(zdToken);
  }
  /* previous method for Zendesk GET. Now support POST only moving forwards */
  // const redirect = 'https://' + subdomain + '.zendesk.com/access/jwt?jwt=' + zdToken;

  //    return res.redirect(307, redirect);
}
