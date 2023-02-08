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
        const { url } = req.body;
        const user = await prisma.user.findUnique({
          where: {
            url,
          },
        });

        let data = { message: "Ссылка свободна", status: true };
        if (user) {
          data = { message: "К сожалению, cсылка занята", status: false };
        }
        res.status(200).json(data);
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
