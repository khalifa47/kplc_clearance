"use client";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import type { EmailJSResponseStatus } from "@emailjs/browser/es/models/EmailJSResponseStatus";

const ClearanceForm = ({ uid, name }: { uid: string; name: string }) => {
  const router = useRouter();

  const handleClearance = async () => {
    fetch(`/api/clearances/${uid}`, {
      method: "POST",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // sending email
    const emailParams = {
      from_name: name,
      from_id: uid,
      to_address: [
        "kplc.hr.admin@yopmail.com",
        "kplc.finance.admin@yopmail.com",
        "kplc.ict.admin@yopmail.com",
      ],
      link_to: `${process.env.NEXTAUTH_URL}/admin`,
    };
    const res: EmailJSResponseStatus = await emailjs.send(
      "service_r034ivr",
      "template_hsxse9p",
      emailParams,
      "faPEvDhcVnB1PzJzo"
    );
    console.log(res);
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
