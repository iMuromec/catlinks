import { HttpMethod } from "@/types";
import { getUser, updateUser } from "@/lib/api/user";

import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options);

  if (!session) {
    return res.status(403).end();
  }

  const userId = session?.user?.id;

  switch (req.method) {
    case HttpMethod.GET:
      return getUser(req, res);

    case HttpMethod.PUT:
      if (!userId) {
        return res.status(403).end();
      }

      return updateUser(req, res, userId);

    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.PUT]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
