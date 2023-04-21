import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import type { Link } from "@prisma/client";

export async function getLinks(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<Link | null>> {
  try {
    const links = await prisma.link.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        position: "desc",
      },
    });
    return res.status(200).json(links);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createLink(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<Link | null>> {
  try {
    const count = await prisma.link.count({
      where: {
        authorId: userId,
      },
    });

    const link = await prisma.link.create({
      data: {
        title: "",
        url: "",
        active: true,
        authorId: userId,
        position: count,
      },
    });
    return res.status(200).json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateLink(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<Link | null>> {
  try {
    const id = req.query.id as string;
    const link = await prisma.link.updateMany({
      where: {
        id,
        authorId: userId,
      },
      data: JSON.parse(req.body),
    });
    return res.status(200).json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateLinks(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<Link | null>> {
  try {
    const links = JSON.parse(req.body);

    await prisma.$transaction(
      links.map((link) =>
        prisma.link.updateMany({
          where: { id: link.id, authorId: userId },
          data: { position: link.position },
        })
      )
    );

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteLink(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
): Promise<void | NextApiResponse<Link | null>> {
  try {
    const id = req.query.id as string;
    const link = await prisma.link.deleteMany({
      where: {
        id,
        authorId: userId,
      },
    });
    return res.status(200).json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
