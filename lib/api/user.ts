import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import type { User } from "@prisma/client";

export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<User | null>> {
  try {
    const url = req.query.userUrl as string;

    const user = await prisma.user.findUnique({
      where: {
        url,
      },
    });

    if (!user?.url) return res.status(404).end();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<User | null>> {
  try {
    const { name, description, url } = req.body;
    const data = { name, description, url };

    const regexAllowedChar = /^[a-zA-Z0-9_-]{3,}$/;
    if (!regexAllowedChar.test(url)) {
      delete data.url;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
