"use client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import LoginSharp from "@mui/icons-material/LoginSharp";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const [staffId, setStaffId] = useState<number>(12345);
  const [pass, setPass] = useState<string>("");
  const router = useRouter();

  return (
    <Paper elevation={5} sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Image src="/kplc.png" alt="logo" width={100} height={100} />
        <Typography variant="h6" fontWeight={600} mt={1}>
          THE KPLC CLEARANCE SYSTEM
        </Typography>
      </Box>

      <Box component="form">
        <TextField
          size={"small"}
          type={"number"}
          name={"staff_id"}
          label="Staff ID"
          fullWidth
          required
          placeholder={"Staff ID"}
          value={staffId}
          //  error={formik.touched.national_id && Boolean(formik.errors.national_id)}
          //  helperText={formik.touched.national_id && formik.errors.national_id}
          onChange={(e) => setStaffId(parseInt(e.target.value))}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <TextField
          size={"small"}
          type={"password"}
          name={"pass"}
          label="Password"
          fullWidth
          required
          placeholder={"Password"}
          value={pass}
          //  error={formik.touched.national_id && Boolean(formik.errors.national_id)}
          //  helperText={formik.touched.national_id && formik.errors.national_id}
          onChange={(e) => setPass(e.target.value)}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <Button
          fullWidth
          size="small"
          color="primary"
          type={"submit"}
          onClick={() => router.push("/")}
          endIcon={<LoginSharp />}
          variant="contained"
          sx={{ my: 1 }}
        >
          Log In
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
