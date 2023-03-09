import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  // creating a clearance
  if (req.method === "POST") {
    const itemsRes = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${id}`);
    const items: Item[] = await itemsRes
      .json()
      .catch((err) => console.log(err));

    const statuses = {
      overall: 3,
      departments: {
        1:
          items.length !== 0 &&
          items
            .filter((item) => item.item.itemCategory.department.id === 1)
            .find((item) => item.returnedOn === null)
            ? 3
            : 4,
        2:
          items.length !== 0 &&
          items
            .filter((item) => item.item.itemCategory.department.id === 2)
            .find((item) => item.returnedOn === null)
            ? 3
            : 4,
        3:
          items.length !== 0 &&
          items
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
    return res.status(200).json("Successfully created clearance");

    // updating a clearance
  } else if (req.method === "PATCH") {
    if (req.headers.dept) {
      // department clearance update
      const departmentClearance = await prisma.departmentClearance.update({
        where: {
          id: req.body.departmentClearanceId,
        },
        data: {
          statusId: 5,
          clearedBy: req.body.clearanceAdminId,
        },
      });
      // .catch((err) => {
      //   throw new Error("Error: ", err);
      // });

      const clearancesDept = await prisma.departmentClearance.findMany({
        where: {
          AND: [
            { clearanceId: departmentClearance.clearanceId },
            { NOT: { statusId: 5 } },
          ],
        },
      });

      if (clearancesDept.length === 0) {
        await prisma.clearance.update({
          where: {
            id: departmentClearance.clearanceId,
          },
          data: {
            statusId: 4,
          },
        });
        // .catch((err) => {
        //   throw new Error("Error: ", err);
        // });
        return res.status(200).json({ uid: id });
      }
      return res.status(200).json("Successfully updated dept clearance");
    } else {
      // overall clearance update
      await prisma.clearance.update({
        where: {
          id: req.body.clearanceId,
        },
        data: {
          statusId: 5,
        },
      });
      // .catch((err) => {
      //   throw new Error("Error: ", err);
      // });
      await prisma.user.update({
        where: {
          id: id?.toString(),
        },
        data: {
          statusId: 2,
        },
      });
      // .catch((err) => {
      //   throw new Error("Error: ", err);
      // });

      return res.status(200).json("Successfully updated overall clearances");
    }
  } else {
    // get clearance
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
            region: {
              select: { name: true },
            },
            department: {
              select: { name: true },
            },
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
