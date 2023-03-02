type DepartmentStatus = {
  clearanceId: number;
  clearedBy: string | null;
  department: { name: string };
  departmentId: number;
  id: number;
  status: { name: Status };
  statusId: number;
  user: { firstName: string; lastName: string } | null;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type Status = "progress" | "approved" | "pending";

type Clearance = {
  createdAt: string;
  id: number;
  status: { name: Status };
  statusId: number;
  updatedAt: string;
  userId: string;
  user: User;
  DepartmentClearance: DepartmentStatus[];
};

type Item = {
  assignedOn: string;
  id: number;
  item: {
    id: string;
    name: string;
    itemCategory: {
      name: string;
      department: {
        id: number;
        name: string;
      };
    };
  };
  user?: User;
  itemId: number;
  returnedOn: string | null;
  userId: string;
};
