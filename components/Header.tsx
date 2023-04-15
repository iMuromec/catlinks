import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { signOut, signIn, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

import ImageWithFallback from "@/components/ImageWithFallback";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row items-center h-9 justify-end mt-2 mr-4">
      <Menu as="div" className="flex text-left justify-end">
        <Menu.Button
          name="Меню"
          className="inline-flex w-9 h-9 justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        >
          {status === "authenticated" && session.user?.image ? (
            <ImageWithFallback
              src={session.user?.image}
              width={36}
              height={36}
              alt={session.user?.name}
              className="w-9 h-9 object-cover rounded-full"
            />
          ) : null}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-4 z-10 mt-2 min-w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {status === "authenticated" ? (
              <div className="py-1">
                <Link
                  href={`/${session.user.url}`}
                  className="text-gray-700 block px-4 py-2 text-sm font-bold"
                >
                  {session.user.email}
                </Link>
                <Menu.Item>
                  <Link
                    href="/edit"
                    className={`
                          ${
                            isActive("/edit")
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }
                         block px-4 py-2 text-sm
                      `}
                  >
                    Личный кабинет
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <div
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className={
                      "text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    }
                  >
                    Выйти
                  </div>
                </Menu.Item>
              </div>
            ) : (
              <div className="py-1">
                <Menu.Item>
                  <div
                    onClick={() => signIn(null, { callbackUrl: "/edit" })}
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                  >
                    Создать страницу / Войти
                  </div>
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Header;
