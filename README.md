This is a [Next.js](https://nextjs.org/) project using Pages Router.
Sample project to show how to add the Zendesk Messaging widget to a Next.js project and to authenticate the user.

## Running the Dev server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# AUTH for ZENDESK MESSAGING WIDGET

## Notes

Kindly use this project as a reference point on how to

1. Generate the JWT Authentication Token for the Zendesk Messaging Widget
2. Call the Zendesk API to pass the JWT Token to the widget to authenticate the user.
3. Use your own implementation to implement these concepts.

## Some Concepts

This is using NextAuth.js as the authentication layer in order to save the JWT Token in the session.
This JWT Token is then passed to the Zendesk Messaging Widget through the user session token.
The user authenticate is hard-coded to jsmith@na.com always. You can change this in your own implementation.
Currently the token EXP (expiry) is set to 30 seconds only for testing purposes.

## The Widget Component

To authenticate the user, you can refer to the `<Widget/>`g component.
This code particular signs the user in by callback using the Token

    zE('messenger', 'loginUser', function (callback) {
          callback(zdToken);
        });

## Generating the JWT Token

Refer to /api/auth-chat-zendesk route.

## Set custom Expiry timings

You can set custom expiry timings in the `exp` property when generating the JWT Token at the api route.

    const payload = {
    name: name,
    email: email,
    exp: Math.floor(new Date().getTime() / 1000.0) + 30, // This in seconds
    external_id: email,
    scope: 'user'
    };

## Extras

This project also has the Custom Launcher to Launch the widget if you wish to use your own logo.
The widget on the left is using the Custom Launcher to launch the widget.

## Learn More / References

To learn more, these are the documentation from Zendesk

- [Messaging Web Authentication Concept](https://support.zendesk.com/hc/en-us/articles/4411666638746-Authenticating-end-users-in-messaging-for-the-Web-Widget-and-mobile-SDK) - The concept for this Zendesk Web Messaging Auth.
- [Step-by-Step](https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/web/enabling_auth_visitors/)
- [Messaging Web Authentication API](https://developer.zendesk.com/api-reference/widget-messaging/web/authentication/) - Zendesk Web Authentication Messaging API.

# SSO for ZENDESK END USER

## Notes

Kindly use this project as a reference point on how to

1. Generate the JWT Authentication Token for the Zendesk End User SSO.
2. Once you've generated the JWT Token with the shared secret, do a POST to Zendesk /jwt endpoint to authenticate the end-user.
3. Use your own implementation to implement these concepts.

## Some Concepts

The JWT token is generated at the backend. Using this token you must use a POST Request to https://{yourdomain}.zendesk.com/access/jwt through a <form>
And pass this JWT to the endpoint above to authenticate the end-user.
You must handle the Authentication of the end-user yourself and then pass it to Zendesk.

## The Client Component to send the POST through a <form>

To authenticate the user, you can refer to the `<LoginZendeskGuide/>` component.
This code particular posts the JWT over and redirects to the specified Zendesk Help Center.

    <form ref={formRef} action="https://bursamy1704942572.zendesk.com/access/jwt" method="post">
        <input ref={inputRef} type="hidden" name="jwt"></input>
        <input type="hidden" name="return_to" value="https://mybursa.zendesk.com"></input>
      </form>

## Generating the JWT Token

Refer to /api/guide-zendesk route.

## Learn More / References

To learn more, these are the documentation from Zendesk

- [Zendesk JWT SSO](https://support.zendesk.com/hc/en-us/articles/4408845838874-Enabling-JWT-single-sign-on) - The concept for this Zendesk Web Messaging Auth.
- [Zendesk JWT Github Examples](https://github.com/zendesk/zendesk_jwt_sso_examples)
