import Head from "next/head";

import prisma from "@/lib/prisma";
import UserInfoStatic from "@/components/UserInfoStatic";
import { site } from "@/config/site";

export default function UserLinks({ links, image, name, description, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col items-center">
        <UserInfoStatic
          name={name}
          userImage={image}
          description={description}
        />
        <div className="min-w-[350px]">
          {links?.map((link) => (
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
}

export async function getServerSideProps({ params }) {
  const url = params.url;

  const user = await prisma.user.findFirst({ where: { url } });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const title = user.name ? `${user.name} — ${site.name}` : site.name;

  const links = await prisma.link.findMany({
    select: {
      id: true,
      title: true,
      url: true,
    },
    where: {
      active: true,
      NOT: [{ title: null }, { title: "" }],
      author: {
        url: {
          equals: url,
          mode: "insensitive",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      links,
      image: user?.image,
      name: user.name,
      description: user?.description,
      title,
    },
  };
}
