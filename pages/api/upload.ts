import { HttpMethod } from "@/types";
import { uploadImage, deleteImage } from "@/lib/api/upload";

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
    case HttpMethod.POST:
      return uploadImage(req, res, userId);
    case HttpMethod.DELETE:
      return deleteImage(req, res, userId);
    default:
      res.setHeader("Allow", [HttpMethod.POST, HttpMethod.DELETE]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
