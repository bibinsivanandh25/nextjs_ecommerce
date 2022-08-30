import React, { useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import { Paper } from "@mui/material";
import PushNotification from "@/forms/admin/settings/PushNotification";
import Email from "@/forms/admin/settings/Email";
import Sms from "@/forms/admin/settings/Sms";

const Settings = () => {
  const [tabList, setTabList] = useState([
    { label: "Push notification", isSelected: true },
    { label: "E-mail", isSelected: true },
    { label: "SMS", isSelected: true },
  ]);

  const handleSelect = (index) => {
    setTabList((list) => {
      const theList = list.map((val, i) => {
        const theVal = val;
        if (index === i) {
          theVal.isSelected = true;
        } else {
          theVal.isSelected = false;
        }
        return theVal;
      });
      return theList;
    });
  };

  return (
    <TabsCard
      tabList={tabList}
      onSelect={(index) => {
        handleSelect(index);
      }}
    >
      <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
        {tabList[0].isSelected && <PushNotification />}
        {tabList[1].isSelected && <Email />}
        {tabList[2].isSelected && <Sms />}
      </Paper>
    </TabsCard>
  );
};

export default Settings;
