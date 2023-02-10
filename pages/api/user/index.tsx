import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "GET") {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
          include: {
            links: {
              select: {
                id: true,
                title: true,
                url: true,
                active: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });

        if (user.image && !user.image.includes("http")) {
          user.image = process.env.OBJ_BUCKET_URL + user.image;
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(500).send({ message: "Server error" });
      } finally {
        await prisma.$disconnect();
      }
    } else if (req.method === "PUT") {
      try {
        const { name, description, url } = req.body;
        const data = { name, description, url };

        const regexAllowedChar = /^[a-zA-Z0-9_-]{3,}$/;
        if (!regexAllowedChar.test(url)) {
          delete data.url;
        }

        const user = await prisma.user.update({
          where: { email: session.user.email },
          data,
        });
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
    }
  } else {
    res.status(200).send({ message: "Unauthorized" });
  }
}
