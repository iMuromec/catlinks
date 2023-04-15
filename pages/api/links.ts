import { HttpMethod } from "@/types";
import { getLinks, updateLink, createLink, deleteLink } from "@/lib/api/links";

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

  if (!userId) {
    return res.status(403).end();
  }

  switch (req.method) {
    case HttpMethod.GET:
      return getLinks(req, res, userId);
    case HttpMethod.POST:
      return createLink(req, res, userId);
    case HttpMethod.PUT:
      return updateLink(req, res, userId);
    case HttpMethod.DELETE:
      return deleteLink(req, res, userId);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.PUT,
        HttpMethod.DELETE,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
