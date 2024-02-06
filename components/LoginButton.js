import { useSession, signIn, signOut } from 'next-auth/react';
export const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="inline-flex items-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#E41C2D] ring-1  ring-[#E41C2D] hover:bg-gray-50"
          onClick={() => {
            zE('messenger', 'logoutUser');
            signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="inline-flex items-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#E41C2D] ring-1  ring-[#E41C2D] hover:bg-gray-50"
        onClick={() => signIn('creds')}
      >
        Sign in
      </button>
    </>
  );
};
