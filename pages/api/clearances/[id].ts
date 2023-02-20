import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  const clearance = await prisma.clearance.findFirstOrThrow({
    where: {
      userId: id?.toString(),
    },
    include: {
      status: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      DepartmentClearance: {
        include: {
          department: {
            select: {
              name: true,
            },
          },
          status: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (clearance) {
    res.status(200).json({ id: id, clearance });
  } else {
    res.status(404).json("User not found");
  }
}
