import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import InputFieldWithChip from "@/atoms/InputWithChip";

let errObj = {
  groupName: false,
  adminManagers: false,
  description: false,
  users: false,
};

const AdminCapabilities = ({ setShowAdminCapabilities }) => {
  const [groupName, setGroupName] = useState("");
  const [adminManagers, setadminManagers] = useState(null);
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);

  const [customCapability, setCustomCapability] = useState(false);

  const [error, setError] = useState(errObj);

  const [productsZeroMargin] = useState([
    { label: "Add Products", enabled: false },
    { label: "Manage Products", enabled: false },
    { label: "Edit live products", enabled: false },
    { label: "Create Discounts", enabled: false },
    { label: "Delete Products", enabled: false },
    { label: "Update Products", enabled: false },
  ]);
  const [productsFixedMargin] = useState([
    { label: "Add Products", enabled: false },
    { label: "Manage Products", enabled: false },
    { label: "Edit live products", enabled: false },
    { label: "Create Discounts", enabled: false },
    { label: "Delete Products", enabled: false },
    { label: "Update Products", enabled: false },
  ]);
  const [categories] = useState([
    { label: "Create Categories", enabled: false },
    { label: "Create Sub-categories", enabled: false },
    { label: "Create commission", enabled: false },
  ]);
  const [orders] = useState([
    { label: "Create order", enabled: false },
    { label: "Manage order", enabled: false },
    { label: "Approve/ reject order", enabled: false },
  ]);

  const [delivery] = useState([
    { label: "Delivery dashboard", enabled: false },
    { label: "Add pincode", enabled: false },
    { label: "Manage weight / charge", enabled: false },
    { label: "Manage reseller order", enabled: false },
  ]);

  const returnProductsZeroMargin = () => {
    return productsZeroMargin.map((val) => {
      return (
        <Box className="d-flex justify-content-evenly align-items-center me-5 pe-3 mt-2">
          <Typography className="me-4">{val.label}</Typography>
          <SwitchComponent label="" />
        </Box>
      );
    });
  };

  const returnProductsFixedMargin = () => {
    return productsFixedMargin.map((val) => {
      return (
        <Box className="d-flex justify-content-evenly align-items-center me-5 pe-3 mt-2">
          <Typography className="me-4">{val.label}</Typography>
          <SwitchComponent label="" />
        </Box>
      );
    });
  };

  const returnCategories = () => {
    return categories.map((val) => {
      return (
        <Box className="d-flex justify-content-evenly align-items-center me-5 pe-4 mt-2">
          <Typography className="me-4">{val.label}</Typography>
          <SwitchComponent label="" />
        </Box>
      );
    });
  };

  const handleError = () => {
    errObj = {
      groupName: false,
      adminManagers: false,
      description: false,
      users: false,
    };
    // console.log(adminManagers);
    if (groupName === "") {
      errObj.groupName = true;
    }
    if (adminManagers === null) {
      errObj.adminManagers = true;
    }

    if (description === "") {
      errObj.description = true;
    }

    if (users.length === 0) {
      errObj.users = true;
    }

    return errObj;
  };

  const handleSubmit = () => {
    setError(handleError());
  };

  const returnOrders = () => {
    return orders.map((val) => {
      return (
        <Box className="d-flex justify-content-evenly align-items-center me-5 pe-4 mt-2">
          <Typography className="me-4">{val.label}</Typography>
          <SwitchComponent label="" />
        </Box>
      );
    });
  };

  const returnDelivery = () => {
    return delivery.map((val) => {
      return (
        <Box className="d-flex justify-content-evenly align-items-center me-5 pe-4 mt-2">
          <Typography className="me-4">{val.label}</Typography>
          <SwitchComponent label="" />
        </Box>
      );
    });
  };

  const handleCancle = () => {
    errObj = {
      groupName: false,
      adminManagers: false,
      description: false,
      users: false,
    };
    setError({ ...errObj });

    setShowAdminCapabilities(false);
  };

  return (
    <Box>
      <Grid container columnSpacing={{ xs: 1, lg: 2 }}>
        <Grid item xs={3} lg={3.4}>
          <Typography className="fw-bold color-orange">
            Admin Capabilities
          </Typography>
          <InputBox
            label="Group Name"
            inputlabelshrink
            className="mt-3"
            onInputChange={(e) => {
              setGroupName(e.target.value);
            }}
            value={groupName}
            error={error.groupName}
            helperText={error.groupName ? validateMessage.field_required : ""}
          />
          <SimpleDropdownComponent
            label="Admin Manager"
            list={[
              { label: "admin manager 1" },
              { label: "admin manager 2" },
              { label: "admin manager 3" },
            ]}
            size="small"
            inputlabelshrink
            className="mt-4"
            onDropdownSelect={(val) => {
              setadminManagers(val);
            }}
            value={adminManagers}
            helperText={
              error.adminManagers ? validateMessage.field_required : ""
            }
          />
          <Box className="position-relative mt-4">
            <Typography
              sx={{ top: "-10px", left: "13px" }}
              className={` ${
                error.description ? "text-danger" : "color-gray"
              } h-5 bg-white position-absolute`}
            >
              Description
            </Typography>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows={4}
              className={`${
                error.description ? "border-danger" : ""
              } w-100 px-2 rounded textArea`}
              style={{ outline: "none" }}
            />
            {error.description && (
              <Typography className="text-danger h-5">
                {validateMessage.field_required}
              </Typography>
            )}
          </Box>
          <InputFieldWithChip
            label="Users"
            inputlabelshrink
            handleChange={(e, val) => {
              setUsers(val);
            }}
            value={users}
            className="mt-3"
            error={error.users}
            helperText={error.users ? validateMessage.field_required : ""}
          />
          <Box className="d-flex align-items-center">
            <Typography className="fw-bold h-5">Custom Capability:</Typography>
            <CheckBoxComponent
              isChecked={customCapability}
              label=""
              className="ms-2"
              checkBoxClick={() => {
                setCustomCapability(!customCapability);
              }}
            />
          </Box>
        </Grid>
        {customCapability ? (
          <Grid marginLeft={2} item xs={4} lg={3.4}>
            <Box>
              <Typography className="fw-bold color-orange">
                Products (Zero Margin)
              </Typography>
              <Box className="d-flex flex-column align-items-end">
                {returnProductsZeroMargin()}
              </Box>
            </Box>
            <Box className="mt-4">
              <Typography className="fw-bold color-orange">
                Products (Fixed Margin)
              </Typography>
              <Box className="d-flex flex-column align-items-end">
                {returnProductsFixedMargin()}
              </Box>
            </Box>
          </Grid>
        ) : null}
        {customCapability ? (
          <Grid item xs={4} lg={3.4}>
            <Box>
              <Typography className="fw-bold color-orange">
                Categories
              </Typography>
              <Box className="d-flex flex-column align-items-end">
                {returnCategories()}
              </Box>
            </Box>
            <Box className="mt-3">
              <Typography className="fw-bold color-orange">Orders</Typography>
              <Box className="d-flex flex-column align-items-end">
                {returnOrders()}
              </Box>
            </Box>
            <Box className="mt-3">
              <Typography className="fw-bold color-orange">Delivery</Typography>
              <Box className="d-flex flex-column align-items-end">
                {returnDelivery()}
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
      <Box sx={{ top: "87%", left: "84%" }} className="position-absolute">
        <Box>
          <ButtonComponent
            label="Cancel"
            variant="outlined"
            borderColor="border-none bg-ligth-gray color-gray"
            onBtnClick={() => {
              handleCancle();
            }}
          />
          <ButtonComponent
            onBtnClick={() => {
              handleSubmit();
            }}
            label="Submit"
            muiProps="ms-2"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCapabilities;
