import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ItemsDialog from "./ItemsDialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DepartmentRow from "./DepartmentRow";

const DepartmentsTable = ({
  userRole,
  userToBeCleared,
  items,
  departments,
  small = false,
  handleOverallClearance,
}: {
  userRole?: string;
  userToBeCleared?: string;
  items: Item[];
  departments: Array<DepartmentStatus>;
  small?: boolean;
  handleOverallClearance?: () => void;
}) => {
  const { data: session } = useSession();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<string>("");

  return (
    <Box sx={{ m: 1 }}>
      <ItemsDialog
        dept={selectedDept}
        items={items.filter(
          (item) =>
            item.item.itemCategory.department.name.toUpperCase() ===
            selectedDept
        )}
        dialogOpen={dialogOpen}
        handleDialogClose={() => setDialogOpen(false)}
      />
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
              Date Last Updated
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((departmentClearance) => (
            <DepartmentRow
              key={departmentClearance.id}
              userRole={userRole}
              userToBeCleared={userToBeCleared}
              clearanceAdminId={session?.user.id}
              departmentClearance={departmentClearance}
              selectDept={() =>
                setSelectedDept(
                  departmentClearance.department.name.toUpperCase()
                )
              }
              openDialog={() => setDialogOpen(true)}
              handleOverallClearance={handleOverallClearance}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DepartmentsTable;
