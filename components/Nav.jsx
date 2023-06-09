"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { ParkadeContext } from "@context/context";

const Nav = () => {
  const { account } = useContext(ParkadeContext);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setupProviders();
  }, []);

  console.log("Session:", session);

  const shortenedAccount = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(account);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full mb-16 pt-3 px-8">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <p className="logo_text">Parkade</p>
      </Link>

      <div className="flex items-center gap-3 md:gap-5">
        {shortenedAccount && (
          <p
            className="text-gray-500 font-bold outline_btn cursor-pointer"
            onClick={copyToClipboard}
          >
            {shortenedAccount}
          </p>
        )}

        {session?.user ? (
          <>
            <button
              type="button"
              onClick={signOut}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
