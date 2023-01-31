import type { NextApiRequest, NextApiResponse } from "next";
import data from "dummy.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(
    data.users.map((user) => {
      return {
        ...user,
        role: data.roles.find((role) => role.id === user.role)!!.name,
        status: data.status.find((status) => status.id === user.status)!!.name,
      };
    })
  );
}
