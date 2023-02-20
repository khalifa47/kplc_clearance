import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DepartmentsTable = ({
  departments,
  small = false,
}: {
  departments: Array<DepartmentStatus>;
  small?: boolean;
}) => {
  const rowStatus = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom component="div">
        Departments Status
      </Typography>
      <Table size={small ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Department
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Certified By
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.departmentId}>
              <TableCell component="th" scope="row" align="center">
                {department.department.name}
              </TableCell>
              <TableCell align="center">
                {department.user
                  ? `${department.user?.firstName} ${department.user?.lastName}`
                  : "Unapproved"}
              </TableCell>
              <TableCell align="center">{"22 Dec 2022"}</TableCell>
              <TableCell align="center">
                {rowStatus[department.status.name]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DepartmentsTable;
