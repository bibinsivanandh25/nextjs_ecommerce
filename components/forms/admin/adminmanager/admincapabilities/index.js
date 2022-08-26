import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import InputBox from "@/atoms/InputBoxComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

let errObj = {
  userName: false,
  email: false,
  firstName: false,
  lastName: false,
  mobileNumber: false,
  invalidEmail: false,
  invalidMobileNumber: false,
  invalidFirstName: false,
  invalidLastName: false,
};

const AdminCapabilities = ({ setShowAdminCapabilities }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });

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
      userName: false,
      email: false,
      firstName: false,
      lastName: false,
      mobileNumber: false,
      invalidEmail: false,
      invalidMobileNumber: false,
      invalidFirstName: false,
      invalidLastName: false,
    };
    if (formData.userName === "") {
      errObj.userName = true;
    }
    if (formData.firstName === "") {
      errObj.firstName = true;
    }
    if (!validationRegex.name.test(formData.firstName)) {
      errObj.invalidFirstName = true;
    }
    if (formData.lastName === "") {
      errObj.lastName = true;
    }
    if (!validationRegex.name.test(formData.lastName)) {
      errObj.invalidLastName = true;
    }

    if (formData.email === "") {
      errObj.email = true;
    }

    if (!validationRegex.email.test(formData.email)) {
      errObj.invalidEmail = true;
    }

    if (formData.mobileNumber === "") {
      errObj.mobileNumber = true;
    }

    if (!validationRegex.mobile.test(formData.mobileNumber)) {
      errObj.invalidMobileNumber = true;
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const returnFirstNameError = () => {
    if (error.firstName) {
      return validateMessage.field_required;
    }
    if (error.invalidFirstName) {
      return "Invalid first name";
    }
    return "";
  };

  const returnLastNameError = () => {
    if (error.lastName) {
      return validateMessage.field_required;
    }
    if (error.invalidLastName) {
      return "Invalid last name";
    }
    return "";
  };

  const returnMobileNumberError = () => {
    if (error.mobileNumber) {
      return validateMessage.field_required;
    }
    if (error.invalidMobileNumber) {
      return validateMessage.mobile;
    }
    return "";
  };

  const returnEmailError = () => {
    if (error.email) {
      return validateMessage.field_required;
    }
    if (error.invalidEmail) {
      return validateMessage.email;
    }
    return "";
  };

  const handleCancle = () => {
    errObj = {
      userName: false,
      email: false,
      firstName: false,
      lastName: false,
      mobileNumber: false,
      invalidEmail: false,
      invalidMobileNumber: false,
      invalidFirstName: false,
      invalidLastName: false,
    };
    setError({ ...errObj });
    setFormData({
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
    });

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
            name="userName"
            label="User Name"
            inputlabelshrink
            className="mt-3"
            onInputChange={handleInputChange}
            value={formData.userName}
            error={error.userName}
            helperText={error.userName ? validateMessage.field_required : ""}
          />
          <InputBox
            name="email"
            label="Email"
            inputlabelshrink
            className="mt-4"
            onInputChange={handleInputChange}
            value={formData.email}
            error={error.email || error.invalidEmail}
            helperText={returnEmailError()}
          />
          <InputBox
            name="firstName"
            label="First Name"
            inputlabelshrink
            className="mt-4"
            onInputChange={handleInputChange}
            value={formData.firstName}
            error={error.firstName || error.invalidFirstName}
            helperText={returnFirstNameError()}
          />
          <InputBox
            name="lastName"
            label="Last Name"
            inputlabelshrink
            className="mt-4"
            onInputChange={handleInputChange}
            value={formData.lastName}
            error={error.lastName || error.invalidLastName}
            helperText={returnLastNameError()}
          />
          <InputBox
            name="mobileNumber"
            label="Mobile No."
            inputlabelshrink
            className="mt-4"
            onInputChange={handleInputChange}
            value={formData.mobileNumber}
            error={error.mobileNumber || error.invalidMobileNumber}
            helperText={returnMobileNumberError()}
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
