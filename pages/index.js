import { Inter } from 'next/font/google';
import { Widget } from '@/components/Widget';
import { LoginButton } from '@/components/LoginButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const zdToken = session?.user.zdMessagingToken || '';

  return (
    <div>
      <header className="bg-white p-3 border-b-[1px]">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <img
            alt="Hubris logo"
            className="h-8"
            src="https://www.bursamalaysia.com/sites/5bb54be15f36ca0af339077a/theme/images/logo.png?1706269554"
          />
          <nav className="flex space-x-24 text-[#060C5C] font-semibold">
            <a className="hover:underline" href="#" rel="ugc">
              Market
            </a>
            <a className="hover:underline" href="#" rel="ugc">
              Knowledge
            </a>
            <a className="hover:underline" href="#" rel="ugc">
              Support
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>

            <LoginButton />
          </div>
        </div>
      </header>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div>MyBursa Chat Widget Sample</div>
      </main>
      <Widget zdToken={zdToken} />
    </div>
  );
}
