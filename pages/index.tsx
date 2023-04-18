import Image from "next/image";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { Logo } from "@/components/Icons";

function Home() {
  return (
    <>
      <Head>
        <title>Котолинкус — одна ссылка для социальных сетей</title>
      </Head>
      <div className="flex flex-col sm:flex-row justify-center sm:mt-0 px-8 sm:px-18  ">
        <div className="w-full grid grid-cols px-2 mt-3 pb-16 justify-items-center content-center ">
          <div className="mx-auto pb-2 w-36">
            <Logo />
          </div>
          <h1 className="text-4xl text-gray-900 text-center font-bold">
            Котолинкус — Всё в одной ссылке
          </h1>
          <p className="mt-6 text-lg text-gray-600 text-center">
            Одна ссылка, которая объединяет все ваши профили в Instagram,
            TikTok, Twitter, YouTube и других социальных сетях.
          </p>
          <button
            name="Создать страницу"
            onClick={() => signIn(null, { callbackUrl: "/edit" })}
            className="mt-8 px-20 py-3 border gap-3 font-semibold bg-blue-500 text-white rounded-lg"
          >
            Создать
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
