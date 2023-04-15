import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";

import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";

import { YandexIcon, GoogleIcon, Logo } from "@/components/Icons";

export default function SignIn({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const router = useRouter();
  const errorQuery = router.query.error;

  const handleSubmit = (e) => {
    if (!email || !email.includes("@")) {
      e.preventDefault();
      setError("Пожалуйста, укажите Email");
    } else {
      setError("");
    }
  };

  const handleEmail = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Войти</title>
      </Head>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-center max-w-lg p-3 gap-3 m-auto w-80 my-10">
          <div className="flex justify-center pb-2 w-24 mx-auto fill-gray-600">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center my-2">Войти</h1>
          {errorQuery && (
            <p className="text-md text-center w-full text-red-500">
              Ошибка входа, попробуйте ещё раз
            </p>
          )}

          <div className="flex flex-row gap-2 my-2">
            {providers &&
              Object.values(providers).map((provider) => {
                if (provider.id == "email") return;

                return (
                  <button
                    key={provider.name}
                    className="w-full text-sm rounded-md text-white border border-[#2e2e2e] p-3 flex flex-row justify-center content-center gap-2"
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/edit" })
                    }
                  >
                    {provider.id == "yandex" && <YandexIcon />}
                    {provider.id == "google" && <GoogleIcon />}
                  </button>
                );
              })}
          </div>
          <hr className="border-[#2e2e2e] w-full my-6" />
          {showEmailForm ? (
            <div className="flex flex-col space-y-4">
              <form
                onSubmit={handleSubmit}
                method="post"
                action="/api/auth/signin/email"
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <div>
                  <label
                    htmlFor="email"
                    className="text-left block text-sm text-[#808080] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleEmail}
                    placeholder="Ваш Email"
                    autoComplete="email"
                    className={`w-full border ${
                      error && "border-red-500"
                    } text-black outline-none rounded-md text-sm placeholder-[#a9a9a9] border-[#3e3e3e] py-3 px-4`}
                    value={email}
                  />
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
                <button
                  className="w-full mt-8 text-sm rounded-md text-white bg-[#3c82f6] p-3 flex flex-row justify-center gap-2"
                  type="submit"
                >
                  Войти по Email
                </button>
                <p className="text-gray-500 mt-3 text-sm w-full justify-center flex">
                  На почту придёт ссылка для входа
                </p>
              </form>
            </div>
          ) : (
            <button
              className="w-full underline decoration-dashed text-md"
              onClick={() => setShowEmailForm(true)}
            >
              Войти по Email
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    const { callbackUrl } = context.query as { callbackUrl: string };
    return { redirect: { destination: callbackUrl || "/" } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
