import { Box, Paper, Typography } from "@mui/material";
import TabsCard from "components/molecule/TabsCard";
import React, { useState } from "react";
import AdminManager from "@/forms/admin/logactivity/AdminManger";
import AdminUsers from "@/forms/admin/logactivity/AdminUsers";

const LogActivity = () => {
  const [list, setList] = useState([
    { isSelected: true, label: "Admin Manager" },
    { isSelected: false, label: "Admin User" },
  ]);
  const selectATab = (index) => {
    setList((aList) => {
      const updatedList = aList.map((val, i) => {
        const theVal = val;
        if (i === index) {
          theVal.isSelected = true;
        } else {
          theVal.isSelected = false;
        }
        return theVal;
      });

      return updatedList;
    });
  };
  return (
    <Box>
      <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
        <Typography className="fw-bold color-orange mb-2">
          Log Activity
        </Typography>
        <TabsCard
          tabList={list}
          onSelect={(index) => {
            selectATab(index);
          }}
        >
          {list[0].isSelected && <AdminManager />}
          {list[1].isSelected && <AdminUsers />}
        </TabsCard>
      </Paper>
    </Box>
  );
};

export default LogActivity;
