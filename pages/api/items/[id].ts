import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  const items = await prisma.assignedItems.findMany({
    where: {
      userId: id?.toString(),
    },
    include: {
      item: {
        select: {
          id: true,
          name: true,
          itemCategory: {
            select: {
              name: true,
              department: {
                select: { name: true },
              },
            },
          },
        },
      },
      // user: {
      //   select: {
      //     id: true,
      //     firstName: true,
      //     lastName: true,
      //   },
      // },
    },
  });

  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404).json("User has no assigned items");
  }
}
