/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ModalComponent from "@/atoms/ModalComponent";
import TextEditor from "@/atoms/TextEditor";

const disabledCustomer = [
  {
    id: "col1",
    label: "S.NO",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Customer ID",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col4",
    label: "Email & Mobile",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
  },
  {
    id: "col5",
    label: "DOB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Refered Reseller",
    minWidth: 150,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Linked also as Vendor",
    minWidth: 200,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Orders",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Total Amount Spend",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Recent Order",
    minWidth: 150,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Login Status",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Reason",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
  },
  {
    id: "col13",
    label: "Browsing History",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col14",
    label: "Comments",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col15",
    label: "Action",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];

const DisabledCustomer = () => {
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [addNotesModalOpen, setAddNotesModalOpen] = useState(false);
  const inputRef = useRef(null);
  const disabledCustomerRow = [
    {
      col1: "1",
      col2: (
        <Typography className="cursor-pointer text-decoration-underline color-light-blue h-5 d-inline text-start">
          #1234345
        </Typography>
      ),
      col3: "Balu",
      col4: (
        <Box className="text-start">
          <Typography className="h-5">balu223423@gmail.com</Typography>
          <Typography className="h-5">9496689934</Typography>
        </Box>
      ),
      col5: "12/05/1998",
      col6: (
        <Box className="text-decoration-underline color-light-blue text-center">
          <Typography className="h-5 cursor-pointer fit-content">
            #1234
          </Typography>
          <Typography className="h-5 cursor-pointer fit-content">
            Rohan
          </Typography>
        </Box>
      ),
      col7: (
        <Box className="text-decoration-underline color-light-blue text-center">
          <Typography className="h-5 cursor-pointer fit-content">
            Vendor
          </Typography>
          <Typography className="h-5 cursor-pointer fit-content">
            SK associates
          </Typography>
        </Box>
      ),
      col8: "85",
      col9: "₹ 34500",
      col10: (
        <Box className="text-center">
          <Typography className="h-5 cursor-pointer fit-content">
            #34555
          </Typography>
          <Typography className="h-5 cursor-pointer fit-content">
            June 5th 2022
          </Typography>
        </Box>
      ),
      col11: "12/05/2022 - 8.09",
      col12: "I Don't Know....",
      col13: "Recently viewed items",
      col14: "NO",
      col15: (
        <Box>
          <CustomIcon type="view" className="fs-18 me-2" />
          <MenuOption
            options={[
              "Delete",
              <>
                Disable{" "}
                <Box className="ms-4">
                  <SwitchComponent label="" />
                </Box>
              </>,
              "Create Disc.",
              "Notify",
              "Add Note",
            ]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              if (ele === "Create Disc.") {
                setDiscountModalOpen(true);
              } else if (ele === "Notify") {
                setNotifyModalOpen(true);
              } else if (ele === "Add Note") {
                setAddNotesModalOpen(true);
              }
            }}
          />
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Box className="mt-1">
        <TableComponent
          showDateFilter
          stickyCheckBox
          columns={disabledCustomer}
          tHeadBgColor="bg-white"
          showCheckbox
          tableRows={disabledCustomerRow}
          draggableHeader={false}
        />
      </Box>
      {discountModalOpen && (
        <ModalComponent
          open={discountModalOpen}
          onCloseIconClick={() => {
            setDiscountModalOpen(false);
          }}
          ModalTitle="Create discount"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setDiscountModalOpen(false);
          }}
        >
          <Box className="pb-5 pt-4 px-4">
            <TextField label="Enter" variant="standard" fullWidth />
          </Box>
        </ModalComponent>
      )}
      {notifyModalOpen && (
        <ModalComponent
          open={notifyModalOpen}
          onCloseIconClick={() => {
            setNotifyModalOpen(false);
          }}
          ModalTitle="Notify"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setNotifyModalOpen(false);
          }}
          ModalWidth={750}
        >
          <Box className="py-3">
            <TextEditor />
          </Box>
        </ModalComponent>
      )}
      {addNotesModalOpen && (
        <ModalComponent
          open={addNotesModalOpen}
          onCloseIconClick={() => {
            setAddNotesModalOpen(false);
          }}
          ModalTitle="Notify"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setAddNotesModalOpen(false);
          }}
          ModalWidth={550}
        >
          <Box className="pb-5 pt-4 px-4">
            <TextField
              label="Enter the percentage of discount"
              variant="standard"
              fullWidth
            />
            <div
              className="d-flex border-light-orange justify-content-center align-items-center mnh-150 mt-2 bg-light-orange2 rounded cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <p className="color-orange h-5">+ Add document</p>
            </div>
            <input type="file" className="d-none" ref={inputRef} />
          </Box>
        </ModalComponent>
      )}
    </Box>
  );
};

export default DisabledCustomer;
