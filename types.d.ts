type DepartmentStatus = {
  department: string;
  status: Status;
  certifier: string;
  date: string;
};

type Status = "progress" | "approved" | "pending";

type User = {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  status: string;
  password: string;
};
