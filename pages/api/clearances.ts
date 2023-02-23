import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const clearanceCount = await prisma.clearance.count();

  const offset = 3;
  const { page } = req.query;
  let shownPage =
    page &&
    typeof page === "string" &&
    parseInt(page) <= Math.ceil(clearanceCount / offset)
      ? parseInt(page)
      : 1;

  const clearances = await prisma.clearance.findMany({
    skip: offset * shownPage - offset,
    take: offset,
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

  if (clearances) {
    res
      .status(200)
      .json({ clearances: clearances, clearanceCount: clearanceCount });
  } else {
    res.status(404).json("Clearances not found");
  }
}
