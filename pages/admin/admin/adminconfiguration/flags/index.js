import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import AdminFlags from "@/forms/admin/flags/AdminFlags";
import SupplierFlags from "@/forms/admin/flags/SupplierFlags";

const Flags = () => {
  const [form, setForm] = useState(0);
  return (
    <Box>
      <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
        <Box className="d-flex ms-2">
          <Box
            className={`px-4 py-2 rounded-pill cursor-pointer ${
              form === 0 ? "bg-orange color-white" : "bg-gray"
            }`}
            onClick={() => {
              setForm(0);
            }}
          >
            <Typography className="cursor-pointer">Admin Flags</Typography>
          </Box>
          <Box
            className={`px-4 py-2 rounded-pill cursor-pointer ms-2 ${
              form === 1 ? "bg-orange color-white" : "bg-gray"
            }`}
            onClick={() => {
              setForm(1);
            }}
          >
            <Typography className="cursor-pointer">Supplier Flags</Typography>
          </Box>
        </Box>
        {form === 0 && <AdminFlags />}
        {form === 1 && <SupplierFlags />}
      </Paper>
    </Box>
  );
};

export default Flags;
