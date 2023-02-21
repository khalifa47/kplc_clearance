import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (req.method === "POST") {
    const clearance = await prisma.clearance.create({
      data: {
        userId: id!.toString(),
        statusId: 3,
      },
    });
    await prisma.departmentClearance.createMany({
      data: [
        {
          clearanceId: clearance.id,
          statusId: 3,
          departmentId: 1,
          clearedBy: null,
        },
        {
          clearanceId: clearance.id,
          statusId: 3,
          departmentId: 2,
          clearedBy: null,
        },
        {
          clearanceId: clearance.id,
          statusId: 3,
          departmentId: 3,
          clearedBy: null,
        },
      ],
      skipDuplicates: true,
    });
  } else {
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
}
