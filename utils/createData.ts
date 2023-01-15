type DepartmentStatus = {
  department: string;
  status: Status;
  certifier: string;
  date: string;
};

type Status = "progress" | "approved" | "pending";

export const createData = (
  user: string,
  status: Status,
  date: string,
  departmentStatuses: Array<DepartmentStatus>
) => {
  return {
    user,
    status,
    date,
    departmentStatuses,
  };
};
