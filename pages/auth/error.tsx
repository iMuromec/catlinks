import Link from "next/link";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { Logo } from "@/components/Icons";

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage;

  switch (error) {
    case "Configuration":
      errorMessage = `
        <h1 class="text-3xl font-bold">Ошибка сервера</h1>
        `;
      break;
    case "AccessDenied":
      errorMessage = `
        <h1 class="text-3xl font-bold">Доступ запрещён</h1>
        <p>У вас нет разрешения на вход.</p>
        `;
      break;
    case "Verification":
      errorMessage = `
        <h1 class="text-3xl font-bold">Ошибка</h1>
        <p>Ссылка для входа больше не действительна.</p>
        <p>Возможно, она уже была использована или срок её действия истек.</p>
        `;
      break;

    default:
      errorMessage = `
        <h1 class="text-3xl font-bold">Ошибка</h1>
        `;
      break;
  }

  return (
    <>
      <Head>
        <title>{error}</title>
      </Head>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg gap-3 p-3 m-auto">
          <div className="flex justify-center pb-2 w-24 mx-auto fill-gray-600">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: errorMessage }}
            className="flex flex-col gap-2 justify-center text-center text-lg p-6 border border-black my-5 rounded-md"
          ></div>

          <Link href={"/"}>
            <button className="p-2 w-full bg-blue-500 text-white rounded-md">
              На главную
            </button>
          </Link>

          <button
            onClick={() => signIn(null, { callbackUrl: "/edit" })}
            className="p-2 w-full bg-blue-500 text-white rounded-md"
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
}
