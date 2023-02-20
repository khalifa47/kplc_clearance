import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

// User
// Date Initiated
// Status

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const clearances = await prisma.clearance.findMany({
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
    res.status(200).json(clearances);
  } else {
    res.status(404).json("Clearances not found");
  }
}
