import Link from "next/link";
import Head from "next/head";

import { Logo } from "@/components/Icons";

export default function VerifyRequestPage() {
  return (
    <>
      <Head>
        <title>Ссылка для входа отправлена ​​на почту</title>
      </Head>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg gap-3 p-3 m-auto">
          <div className="flex justify-center pb-6 w-24 mx-auto fill-blue-600">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex flex-col gap-2 justify-center text-center text-lg px-6 py-16 border border-black my-5 rounded-md">
            <h1 className="text-2xl">Ссылка для входа отправлена ​​на почту</h1>
          </div>
        </div>
      </div>
    </>
  );
}
