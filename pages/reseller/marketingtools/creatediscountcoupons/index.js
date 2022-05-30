import { Delete, RemoveRedEye, Share, WhatsApp } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import CreateDiscount from "components/forms/reseller/marketingtools/creatediscount";
import { useState } from "react";

const CreateDiscountCoupons = () => {
  const columns = [
    {
      id: "col1", //id value in column should be presented in row as key
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
  let rows = [
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
        <div className="d-flex justify-content-between">
          <RemoveRedEye className="fs-18" />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
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
        <div className="d-flex justify-content-between">
          <RemoveRedEye className="fs-18" />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
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
              <Typography className="h-6 fw-bold">
                Subscription Start Date & time:{Date()}
              </Typography>
            </Grid>
            <Grid>
              <Typography className="h-6 fw-bold">
                Subscription End Date & time:{Date()}
              </Typography>
            </Grid>
            <Grid>
              <ButtonComponent
                variant="outlined"
                label="Create Discounts"
                onBtnClick={() => {
                  setShowCreateDiscount(true);
                }}
              />
              <Typography
                sx={{
                  width: "fit-content",
                  mx: "auto",
                }}
                className="h-6 text-primary cursor-pointer py-1"
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
          btnText="View Discount Price"
        />
      )}
    </div>
  );
};
export default CreateDiscountCoupons;
