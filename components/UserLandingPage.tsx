import Head from "next/head";
import UserInfo from "./UserInfo";

const UserLandingPage = ({ user }) => {
  const title = user.name ? `${user.name} | Cat Links` : "Cat Links";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col items-center">
        <UserInfo user={user} />
        <div className="min-w-[350px]">
          {user.links.map((link) => (
            <div
              key={link.id}
              className="mt-5 flex flex-row gap-4 justify-center "
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener"
                className=" bg-white w-full hover:bg-gray-100 text-center text-gray-800 font-semibold py-4 sm:py-3 px-4 text-lg sm:text-base rounded-xl transition ease-in-out duration-150"
              >
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserLandingPage;
