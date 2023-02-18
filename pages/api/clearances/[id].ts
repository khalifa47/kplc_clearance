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

  res.status(200).json({ id: id, clearance });
}
