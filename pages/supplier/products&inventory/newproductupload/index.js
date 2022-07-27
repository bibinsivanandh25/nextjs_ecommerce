import { Box, Grid, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";
import CustomIcon from "services/iconUtils";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Upload ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Full Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Type ",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col4",
    label: "Uploaded Date",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col5",
    label: "Preview ",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
];
const rows = [
  {
    id: "1",
    col1: "#23324234",
    col2: "Gucci HandBag",
    col3: "Bags",
    col4: "31-05-2030",
    col5: (
      <div className="d-flex justify-content-center align-items-center ">
        <CustomIcon type="remove" title="Detail" />
      </div>
    ),
  },
  {
    id: "1",
    col1: "#23324234",
    col2: "Gucci HandBag",
    col3: "Bags",
    col4: "31-05-2030",
    col5: (
      <div className="d-flex justify-content-center align-items-center">
        <CustomIcon type="remove" title="Detail" />
      </div>
    ),
  },
];

const NewProductUpload = () => {
  return (
    <Paper className="mnh-80vh overflow-auto hide-scrollbar mxh-80vh">
      <div className="fs-14 fw-bold border-bottom p-3 mb-3">
        Get Started by Adding Products
      </div>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3} className="px-4 pb-4">
          <Grid item sm={4}>
            <SimpleDropdownComponent
              label="Select Category"
              inputlabelshrink
              size="small"
            />
          </Grid>
          <Grid
            className="d-flex justify-content-center align-items-center"
            item
            sm={3}
          >
            <ButtonComponent
              muiProps="w-100 d-flex justify-content-between ps-0 m-0 fs-11"
              size="large"
              variant="outlined"
              iconName="download"
              showIcon
              iconOrintation="end"
              label="Download Excel Template"
              borderColor="border-secondary"
              textColor="text-secondary"
            />
          </Grid>
          <Grid
            className="d-flex justify-content-center align-items-center"
            item
            sm={3}
          >
            <ButtonComponent
              showIcon
              muiProps="w-100 d-flex justify-content-between ps-0 m-0 fs-11 "
              size="large"
              variant="outlined"
              iconName="upload"
              iconOrintation="end"
              label="Upload Excel Template"
              borderColor="border-secondary"
              textColor="text-secondary"
            />
          </Grid>
          <Grid className="d-flex" item sm={2}>
            <ButtonComponent
              muiProps="w-100 fw-bold"
              size="medium"
              label="Submit"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Paper className="mx-4 mb-3">
          <TableComponent
            showCheckbox={false}
            showSearchFilter={false}
            showSearchbar={false}
            table_heading="New Collection Upload"
            tableRows={[...rows]}
            columns={[...columns]}
          />
        </Paper>
      </Box>
    </Paper>
  );
};
export default NewProductUpload;
