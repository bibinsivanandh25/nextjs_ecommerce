import { Grid, Paper, Button } from "@mui/material";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SelectComponent from "components/atoms/SelectComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AddNewCoupons = () => {
  const tabList = [
    {
      title: "Restriction",
      id: "restriction",
    },
    {
      title: "Limits",
      id: "limits",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("restriction");

  return (
    <Paper sx={{ height: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          container
          justifyContent="center"
          alignItems="start"
          sx={{ borderRight: "1px solid lightgray", height: "100%" }}
        >
          <Grid container item xs={10} spacing={2} pt={4}>
            <Grid item xs={12}>
              <InputBox
                label="Code"
                placeholder="eg: 09543u45"
                inputlabelshrink
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                label="Description"
                placeholder="eg: Simple Product"
                inputlabelshrink
                isMultiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <SimpleDropdownComponent label="Discount Type" inputlabelshrink />
            </Grid>
            <Grid item xs={12}>
              <InputBox label="Coupon Amount" inputlabelshrink />
            </Grid>
            <Grid item xs={12}>
              <DatePickerComponent
                label="Coupon Expiry Date"
                size="small"
                inputlabelshrink
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} container>
          <Grid item container alignItems="start">
            <Grid item xs={4} p={3} container spacing={1} alignItems="start">
              {tabList.map((tab) => (
                <Grid item xs={12} key={tab.id}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ width: "200px", textTransform: "none" }}
                    className={`${
                      selectedTab === tab.id
                        ? "bg-light-orange"
                        : "bg-light-gray text-dark"
                    } shadow-none`}
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} lg={4} container spacing={2} mt={1}>
              {selectedTab === "restriction" && (
                <>
                  <Grid item xs={12}>
                    <div className="d-flex align-items-center h-100">
                      <SimpleDropdownComponent
                        label="Category Include"
                        size="small"
                        inputlabelshrink
                      />
                      <InfoOutlinedIcon className="ms-2" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex align-items-center h-100">
                      <SimpleDropdownComponent
                        label="Products Include"
                        size="small"
                        inputlabelshrink
                      />
                      <InfoOutlinedIcon className="ms-2" />
                    </div>
                  </Grid>
                </>
              )}
              {selectedTab === "limits" && (
                <>
                  <Grid item xs={11}>
                    <InputBoxComponent
                      placeholder="eg: Zero"
                      inputlabelshrink
                      label="Usage Limit Per Coupon"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <InputBoxComponent
                      placeholder="eg: Apply to all Qualified items in Cart"
                      inputlabelshrink
                      label="Limit usage to X items"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex align-items-center h-100">
                      <InputBoxComponent
                        placeholder="eg: Unlimited Usage"
                        inputlabelshrink
                        label="Usage Limit Per User"
                      />
                      <InfoOutlinedIcon className="ms-1" />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            justifyContent="end"
            container
            alignItems="self-end"
            spacing={3}
            m={3}
          >
            <Grid item>
              <Button
                variant="contained"
                size="small"
                className="bg-orange"
                sx={{ width: "150px", textTransform: "none" }}
              >
                Draft
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                sx={{ width: "150px", textTransform: "none" }}
                className="bg-orange"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddNewCoupons;
