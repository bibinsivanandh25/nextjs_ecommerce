/* eslint-disable no-use-before-define */
import AdminTags from "@/forms/admin/tags/admintags";
import SupplierTags from "@/forms/admin/tags/suppliertags";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

const Tags = () => {
  const [form, setForm] = useState("admintags");
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box className="d-flex align-items-center ms-1 mb-3">
        <Typography
          className={`rounded-pill p-2 ms-4 h-5  cursor-pointer ${
            form === "admintags" ? "bg-orange color-white fw-bold" : "bg-gray"
          }`}
          onClick={() => {
            setForm("admintags");
          }}
        >
          Admin Tags
        </Typography>
        <Typography
          className={`rounded-pill p-2 ms-2 h-5  cursor-pointer ${
            form === "suppliertags"
              ? "bg-orange color-white fw-bold"
              : "bg-gray"
          }`}
          onClick={() => {
            setForm("suppliertags");
          }}
        >
          Supplier Tags
        </Typography>
      </Box>
      <Box>{form === "admintags" ? <AdminTags /> : null}</Box>
      <Box>{form === "suppliertags" ? <SupplierTags /> : null}</Box>
    </Paper>
  );
};

export default Tags;
