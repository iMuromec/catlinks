import type { NextApiRequest, NextApiResponse } from "next";
import { extname } from "node:path";
import { getSession } from "next-auth/react";
import { createId } from "@paralleldrive/cuid2";
import prisma from "@lib/prisma";
import { GetUploadUrl, DeleteFileFromCloud } from "@lib/cloudUpload";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const { email } = session.user;

    if (req.method === "POST") {
      try {
        const { name, type, currentName } = req.body;

        const fileExt = extname(name);
        const newFileName = `${createId()}${fileExt}`;
        const signedUrl = await GetUploadUrl(newFileName, type);

        DeleteFileFromCloud(currentName);
        DatabaseImageUpdate(
          email,
          `https://${process.env.OBJ_BUCKET_NAME}.storage.yandexcloud.net/${newFileName}`
        );

        res.status(200).json({ url: signedUrl });
      } catch (error) {
        throw new Error(error);
      } finally {
        await prisma.$disconnect();
      }
    } else if (req.method === "DELETE") {
      try {
        const { name } = req.body;

        DeleteFileFromCloud(name);
        DatabaseImageUpdate(email, "");

        res.status(200).json({ image: "" });
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
    res.status(401).send({ message: "Unauthorized" });
  }
}

async function DatabaseImageUpdate(email, image) {
  prisma.user.update({
    where: { email },
    data: { image },
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
