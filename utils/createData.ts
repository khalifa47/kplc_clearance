export const createDataAdmin = (
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

export const createDataEmployee = (departments: DepartmentStatus) =>
  departments;
