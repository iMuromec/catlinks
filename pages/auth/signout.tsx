import Link from "next/link";
import Head from "next/head";
import { signOut } from "next-auth/react";

import { Logo } from "@/components/Icons";

export default function SignOutPage() {
  return (
    <>
      <Head>
        <title>Выйти</title>
      </Head>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-center max-w-lg gap-3 p-3 m-auto">
          <div className="flex justify-center pb-2 w-24 mx-auto fill-gray-600">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 w-full px-20 bg-blue-500 text-white rounded-md"
          >
            Выйти
          </button>
        </div>
      </div>
    </>
  );
}
