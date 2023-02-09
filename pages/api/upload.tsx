import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import formidable from "formidable";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";
import { unlink } from "node:fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function deleteImageFile(session) {
  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: {
      image: true,
    },
  });

  if (!user.image) return;

  const fullImagePath = join(
    process.env.ROOT_DIR || process.cwd(),
    `./public`,
    user.image
  );

  unlink(fullImagePath, (err) => {
    if (err) {
      console.error("Image was not deleted", err);
    }
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "POST") {
      try {
        let image = "";
        const form = formidable({
          keepExtensions: true,
          uploadDir: join(
            process.env.ROOT_DIR || process.cwd(),
            `./public/images`
          ),
          maxFileSize: 10 * 1024 * 1024,
        });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.log(err);
          }

          let filename = Array.isArray(files.file)
            ? files.file.map((f) => f.newFilename)
            : null;

          if (filename) {
            image = `/images/${filename[0]}`;
            deleteImageFile(session);

            const user = await prisma.user.update({
              where: { email: session.user.email },
              data: { image },
            });
            res.status(201).json({ image: user.image });
          } else {
            throw new Error("No Image");
          }
        });
      } catch (error) {
        throw new Error(error);
        // console.log(error);
        // res.status(500).send({ message: "Server error" });
      } finally {
        await prisma.$disconnect();
      }
    } else if (req.method === "DELETE") {
      try {
        deleteImageFile(session);

        const user = await prisma.user.update({
          where: { email: session.user.email },
          data: { image: "" },
        });

        res.status(200).json({ image: user.image });
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
