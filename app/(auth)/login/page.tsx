"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LoginSharp from "@mui/icons-material/LoginSharp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "@/utils/login";

const validationSchema = yup.object({
  staff_id: yup.number().required("Staff ID is required"),
  password: yup
    .string()
    // .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { staff_id: 0, password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await login(values);

        // dispatch(setUser(JSON.stringify(user)));
        console.log(user);
        // router.replace("/");
      } catch (err) {
        console.error(err);
        // toast({ msg: err.message });
      }
    },
  });

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
          value={formik.values.staff_id}
          error={formik.touched.staff_id && Boolean(formik.errors.staff_id)}
          helperText={formik.touched.staff_id && formik.errors.staff_id}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <TextField
          size={"small"}
          type={"password"}
          name={"password"}
          label="Password"
          fullWidth
          required
          placeholder={"Password"}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <Button
          fullWidth
          size="small"
          color="primary"
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            formik.submitForm();
          }}
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
