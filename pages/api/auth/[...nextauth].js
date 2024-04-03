import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseUrl = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      id: 'creds',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const res = await fetch(`${baseUrl}/api/auth-chat-zendesk`, {
            method: 'POST',
            body: JSON.stringify({
              email: 'smith@na.com',
              name: 'Smith (Example User)'
            }),
            headers: { 'Content-Type': 'application/json' }
          });
          const token = await res.json();
          if (res.ok && token) {
            return {
              id: 1,
              name: 'Smith (Example User)',
              email: 'smith@na.com',
              zdMessagingToken: token
            };
          }
        } catch (e) {
          // If no error and we have user data, return it

          console.log('failed to get jwt zd', e);
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(args) {
      const { token, user } = args;
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    }
  }
};
export default NextAuth(authOptions);
