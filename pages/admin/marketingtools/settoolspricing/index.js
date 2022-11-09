import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import ResellerSubscriptions from "@/forms/admin/marketingtools&subscriptions/settoolspricing/ResellerSubscriptions";
import SupplierSubscriptions from "@/forms/admin/marketingtools&subscriptions/settoolspricing/SupplierSubscriptions";

const SetToolsPricing = () => {
  const [form, setForm] = useState("SupplierSubscriptions");
  return (
    <Box>
      <Paper className="p-3 overflow-auto hide-scrollbar">
        <Box className="d-flex align-items-center ms-4 mb-3">
          <Typography
            className={`rounded-pill p-2 ms-2 h-5  cursor-pointer ${
              form === "SupplierSubscriptions"
                ? "bg-orange color-white fw-bold"
                : "bg-gray"
            }`}
            onClick={() => {
              setForm("SupplierSubscriptions");
            }}
          >
            Supplier Subscriptions
          </Typography>
          <Typography
            className={`rounded-pill p-2 ms-4 h-5  cursor-pointer ${
              form === "ResellerSubscriptions"
                ? "bg-orange color-white fw-bold"
                : "bg-gray"
            }`}
            onClick={() => {
              setForm("ResellerSubscriptions");
            }}
          >
            Reseller Subscriptions
          </Typography>
        </Box>
        {form === "SupplierSubscriptions" && <SupplierSubscriptions />}
        {form === "ResellerSubscriptions" && <ResellerSubscriptions />}
      </Paper>
    </Box>
  );
};

export default SetToolsPricing;
