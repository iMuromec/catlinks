import { extname } from "node:path";
import { createId } from "@paralleldrive/cuid2";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { GetUploadUrl } from "@/lib/cloudUpload";

export async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  try {
    const { name, type } = req.body;

    const fileExt = extname(name);
    const newFileName = `avatars/${createId()}${fileExt}`;
    console.log(newFileName);
    const signedUrl = await GetUploadUrl(newFileName, type);
    const imageUrl = `${process.env.OBJ_BUCKET_URL}${newFileName}`;

    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return res.status(200).json({ signedUrl, imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteImage(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { image: "" },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
