import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "POST") {
      try {
        const link = await prisma.link.create({
          data: {
            ...req.body,
            author: {
              connect: {
                email: session.user.email,
              },
            },
          },
        });
        res.status(201).json(link);
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
