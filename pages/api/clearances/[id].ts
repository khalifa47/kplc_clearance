import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (req.method === "POST") {
    const itemsRes = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${id}`);
    const items: Item[] = await itemsRes
      .json()
      .catch((err) => console.log(err));

    const statuses = {
      overall: items.find((item) => item.returnedOn === null) ? 3 : 4,
      departments: {
        1: items
          .filter((item) => item.item.itemCategory.department.id === 1)
          .find((item) => item.returnedOn === null)
          ? 3
          : 4,
        2: items
          .filter((item) => item.item.itemCategory.department.id === 2)
          .find((item) => item.returnedOn === null)
          ? 3
          : 4,
        3: items
          .filter((item) => item.item.itemCategory.department.id === 3)
          .find((item) => item.returnedOn === null)
          ? 3
          : 4,
      },
    };

    const clearance = await prisma.clearance.create({
      data: {
        userId: id!.toString(),
        statusId: statuses.overall,
      },
    });
    await prisma.departmentClearance.createMany({
      data: [
        {
          clearanceId: clearance.id,
          statusId: statuses.departments[1],
          departmentId: 1,
          clearedBy: null,
        },
        {
          clearanceId: clearance.id,
          statusId: statuses.departments[2],
          departmentId: 2,
          clearedBy: null,
        },
        {
          clearanceId: clearance.id,
          statusId: statuses.departments[3],
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
