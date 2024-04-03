import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useRef } from 'react';

export const LoginZendeskGuide = () => {
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      // Assuming you have an API endpoint for authentication that returns a JWT
      const response = await fetch('/api/guide-zendesk');

      if (response.ok) {
        const data = await response.json();

        inputRef.current.value = data;
        formRef.current.submit();
      } else {
        console.error('Failed to authenticate:', await response.text());
        // Handle authentication failure, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <form id="yourLoginForm">
        {/* Your login form fields */}
        <button
          className="inline-flex items-center py-4 text-sm font-semibold text-green-800 bg-white rounded-full px-7 ring-1 ring-green-800 hover:bg-gray-50"
          type="submit"
          onClick={handleLogin}
        >
          Login to Zendesk Guide
        </button>
      </form>
      <form ref={formRef} action="https://bursamy1704942572.zendesk.com/access/jwt" method="post">
        <input ref={inputRef} type="hidden" name="jwt"></input>
        <input type="hidden" name="return_to" value="https://mybursa.zendesk.com"></input>
      </form>
    </div>
  );
};
