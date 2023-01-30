type DepartmentStatus = {
  department: string;
  status: Status;
  certifier: string;
  date: string;
};

type Status = "progress" | "approved" | "pending";
