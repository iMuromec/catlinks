import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const linkId = req.query.id;
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const link = await prisma.link.findFirst({
        where: {
          id: String(linkId),
          author: {
            email: session.user.email,
          },
        },
      });
      res.json(link);
    } else if (req.method === "PUT") {
      try {
        const link = await prisma.link.updateMany({
          where: {
            id: String(linkId),
            author: {
              email: session.user.email,
            },
          },
          data: req.body,
        });
        res.status(200).json(link);
      } catch (error) {
        res.status(500).send({ message: "Server error" });
      } finally {
        await prisma.$disconnect();
      }
    } else if (req.method === "DELETE") {
      try {
        const link = await prisma.link.deleteMany({
          where: {
            id: String(linkId),
            author: {
              email: session.user.email,
            },
          },
        });
        res.status(200).json(link);
      } catch (error) {
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
    res.status(401).send({ message: "Unauthorized" });
  }
}
