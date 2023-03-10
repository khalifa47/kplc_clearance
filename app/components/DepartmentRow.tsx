import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { dateFormat, sendEmail } from "@/utils/helpers";

const DepartmentRow = ({
  departmentClearance,
  userToBeCleared,
  clearanceAdminId,
  userRole,
  selectDept,
  openDialog,
  handleOverallClearance,
}: {
  departmentClearance: DepartmentStatus;
  userToBeCleared?: string;
  clearanceAdminId?: string;
  userRole?: string;
  selectDept: () => void;
  openDialog: () => void;
  handleOverallClearance?: () => void;
}) => {
  const [status, setStatus] = useState(departmentClearance.status.name);

  const rowStatus = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  const handleClickRow = () => {
    selectDept();
    openDialog();
  };

  const handleDepartmentClearanceApproval = async () => {
    fetch(`/api/clearances/${departmentClearance.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        dept: "true",
      },
      body: JSON.stringify({
        departmentClearanceId: departmentClearance.id,
        clearanceAdminId: clearanceAdminId,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setStatus("approved");
        if (data.uid) {
          handleOverallClearance && handleOverallClearance();
          await sendEmail(
            userToBeCleared!,
            data.uid,
            "kplc.paymaster.admin@yopmail.com"
          );
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <TableRow
      hover
      key={departmentClearance.departmentId}
      sx={{
        cursor: "pointer",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        align="center"
        onClick={handleClickRow}
      >
        {departmentClearance.department.name.toUpperCase()}
      </TableCell>
      <TableCell align="center" onClick={handleClickRow}>
        {departmentClearance.user
          ? `${departmentClearance.user?.firstName} ${departmentClearance.user?.lastName}`
          : "Unapproved"}
      </TableCell>
      <TableCell align="center" onClick={handleClickRow}>
        {dateFormat(departmentClearance.updatedAt)}
      </TableCell>
      <TableCell align="center" onClick={handleClickRow}>
        {rowStatus[status]}
      </TableCell>
      <TableCell
        align="right"
        sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
      >
        {status === "progress" &&
          userRole === departmentClearance.department.name && (
            <IconButton
              color="primary"
              onClick={handleDepartmentClearanceApproval}
            >
              <CheckIcon />
            </IconButton>
          )}
      </TableCell>
    </TableRow>
  );
};

export default DepartmentRow;
