"use client";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const ClearanceForm = ({ uid }: { uid: string }) => {
  const router = useRouter();
  const handleClearance = async () => {
    fetch(`/api/clearances/${uid}`, {
      method: "POST",
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
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" size="large" onClick={handleClearance}>
          Request Clearance
        </Button>
      </Box>
    </>
  );
};

export default ClearanceForm;
