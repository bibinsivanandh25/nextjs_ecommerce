import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import CreateDiscount from "components/forms/reseller/marketingtools/creatediscount";
import { useState } from "react";
import CustomIcon from "services/iconUtils";

const CreateTodaysDeals = () => {
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Campaign Title",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Margin Type",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Category",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Sub Category",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Start Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "End Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Created Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Customer Type",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Admin Approval",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col10",
      label: "Status",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col11",
      label: "Action",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col9: "Approved",
      col10: "Active",
      col11: (
        <div className="d-flex justify-content-center">
          <CustomIcon type="remove" className="fs-16" />
          <CustomIcon type="share" className="fs-16 mx-1" />
          <CustomIcon type="delete" className="fs-16" />
        </div>
      ),
    },
    {
      id: "1",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col9: "Approved",
      col10: "Active",
      col11: (
        <div className="d-flex justify-content-center">
          <CustomIcon type="remove" className="fs-16" />
          <CustomIcon type="share" className="fs-16 mx-1" />
          <CustomIcon type="delete" className="fs-16" />
        </div>
      ),
    },
  ];

  const [showCreateDiscount, setShowCreateDiscount] = useState(false);

  return (
    <div>
      {!showCreateDiscount ? (
        <div>
          <Grid className="d-flex justify-content-between align-items-center my-2">
            <Grid>
              <Typography className="fs-12 fw-bold">
                Subscription Start Date & time:{Date()}
              </Typography>
            </Grid>
            <Grid>
              <Typography className="fs-12 fw-bold">
                Subscription End Date & time:{Date()}
              </Typography>
            </Grid>
            <Grid>
              <ButtonComponent
                variant="outlined"
                label="Create Today's Deal"
                onBtnClick={() => {
                  setShowCreateDiscount(true);
                }}
              />
              <Typography
                sx={{
                  width: "fit-content",
                  mx: "auto",
                }}
                className="h-5 text-primary cursor-pointer py-1"
              >
                Guidelines to Create
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <TableComponent
              tableRows={[...rows]}
              columns={[...columns]}
              showCheckbox
              showSearchFilter={false}
              showSearchbar={false}
            />
          </Grid>
        </div>
      ) : (
        <CreateDiscount
          setShowCreateDiscount={setShowCreateDiscount}
          btnText="View Today's Deal"
        />
      )}
    </div>
  );
};
export default CreateTodaysDeals;
