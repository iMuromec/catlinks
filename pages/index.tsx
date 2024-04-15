import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import { Logo } from "@/components/Icons";
import { site } from "@/config/site";

function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated" && session.user?.email;

  return { data: session, loading, authenticated };
}

function Home() {
  const { loading, authenticated } = useAuth();

  return (
    <>
      <Head>
        <title>{`${site.name} — одна ссылка для социальных сетей`}</title>
      </Head>
      <div className="flex flex-col sm:flex-row justify-center sm:mt-0 px-8 sm:px-18  ">
        <div className="w-full grid grid-cols px-2 mt-3 pb-16 justify-items-center content-center ">
          <div className="mx-auto pb-2 w-36">
            <Logo />
          </div>
          <h1 className="text-4xl text-gray-900 text-center font-bold">
            {`${site.name} — всё в одной ссылке`}
          </h1>
          <p className="mt-6 text-lg text-gray-600 text-center">
            Одна ссылка, которая объединяет все ваши профили в Instagram,
            TikTok, Twitter, YouTube и других социальных сетях.
          </p>
          <button
            name="Создать страницу"
            className="mt-8 border gap-3 font-semibold bg-blue-500 text-white rounded-lg flex relative"
          >
            {loading || !authenticated ? (
              <div
                onClick={() => signIn(null, { callbackUrl: "/edit" })}
                className="px-20 py-3"
              >
                Создать
              </div>
            ) : authenticated ? (
              <Link href="/edit" className="px-20 py-3">
                Личный кабинет
              </Link>
            ) : null}
          </button>
        </div>
        <div className="w-full grid grid-cols-2 sm:mt-12 gap-3 px-2 justify-items-center content-center">
          <div className="max-w-[250px] grid grid-cols-1 justify-items-center content-center">
            <Image
              src="/static/kristina-1.png"
              width={350}
              height={684}
              alt="phone"
            />
          </div>

          <div className="max-w-[400px]">
            <Image
              src="/static/andrey-tablet-1.png"
              width={500}
              height={688}
              alt="tablet"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
