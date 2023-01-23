export type DepartmentStatus = {
  department: string;
  status: Status;
  certifier: string;
  date: string;
};

export type Status = "progress" | "approved" | "pending";
