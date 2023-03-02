import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ItemsDialog from "./ItemsDialog";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const DepartmentsTable = ({
  items,
  departments,
  small = false,
}: {
  items: Item[];
  departments: Array<DepartmentStatus>;
  small?: boolean;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const rowStatus = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<string>("");

  const handleDepartmentClearanceApproval = async (
    departmentClearanceId: number
  ) => {
    fetch(`/api/clearances/${departmentClearanceId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        dept: "true",
      },
      body: JSON.stringify({
        departmentClearanceId: departmentClearanceId,
        clearanceAdminId: session?.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    router.refresh();
  };

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
              Date
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow
              hover
              key={department.departmentId}
              sx={{
                cursor: "pointer",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                onClick={() => {
                  setSelectedDept(department.department.name.toUpperCase());
                  setDialogOpen(true);
                }}
              >
                {department.department.name.toUpperCase()}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  setSelectedDept(department.department.name.toUpperCase());
                  setDialogOpen(true);
                }}
              >
                {department.user
                  ? `${department.user?.firstName} ${department.user?.lastName}`
                  : "Unapproved"}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  setSelectedDept(department.department.name.toUpperCase());
                  setDialogOpen(true);
                }}
              >
                {department.updatedAt}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  setSelectedDept(department.department.name.toUpperCase());
                  setDialogOpen(true);
                }}
              >
                {rowStatus[department.status.name]}
              </TableCell>
              <TableCell
                align="right"
                sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {department.status.name === "progress" && (
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleDepartmentClearanceApproval(department.id)
                    }
                  >
                    <CheckIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DepartmentsTable;
