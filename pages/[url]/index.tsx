import prisma from "@lib/prisma";
import UserLandingPage from "@components/UserLandingPage";

export default function UserLinks({ user }) {
  return <UserLandingPage user={user} />;
}

export async function getServerSideProps({ params }) {
  const url = params.url;

  const user = await prisma.user.findFirst({
    where: {
      url: {
        equals: url,
      },
    },
    include: {
      links: {
        select: {
          id: true,
          title: true,
          url: true,
        },
        where: {
          active: true,
          NOT: [{ title: null }, { title: "" }],
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  if (user.image && !user.image.includes("http")) {
    user.image = process.env.OBJ_BUCKET_URL + user.image;
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
