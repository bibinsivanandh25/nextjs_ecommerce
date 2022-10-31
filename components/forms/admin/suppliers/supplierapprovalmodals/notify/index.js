/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TextEditor from "@/atoms/TextEditor";
import ButtonComponent from "@/atoms/ButtonComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const NotificationModal = ({
  notifyModalOpen,
  setNotifyModalOpen = () => {},
}) => {
  const [modalCheckBox, setModalCheckBox] = useState({
    customer: false,
    reseller: false,
    supplier: false,
  });
  const [messageCheckBox, setMessageCheckBox] = useState({
    pushnotification: false,
    email: false,
    message: false,
  });
  const [selectRadio, setSelectRadio] = useState("Only Attachment");

  return (
    <Box>
      <ModalComponent
        open={notifyModalOpen}
        onCloseIconClick={() => {
          setNotifyModalOpen(false);
        }}
        ModalTitle="Notify"
        titleClassName="h-5 color-orange"
        showFooter={false}
        minWidth={700}
      >
        <Box className="p-2 mxh-500 overflow-auto hide-scrollbar">
          <Grid container>
            <Grid item sm={4}>
              <CheckBoxComponent
                label="Customer"
                isChecked={modalCheckBox.customer}
                checkBoxClick={() => {
                  setModalCheckBox((prev) => ({
                    ...prev,
                    customer: !modalCheckBox.customer,
                  }));
                }}
              />
            </Grid>
            <Grid item sm={4}>
              <CheckBoxComponent
                label="Reseller"
                isChecked={modalCheckBox.reseller}
                checkBoxClick={() => {
                  setModalCheckBox((prev) => ({
                    ...prev,
                    reseller: !modalCheckBox.reseller,
                  }));
                }}
              />
            </Grid>
            <Grid item sm={4}>
              <CheckBoxComponent
                label="Supplier"
                isChecked={modalCheckBox.supplier}
                checkBoxClick={() => {
                  setModalCheckBox((prev) => ({
                    ...prev,
                    supplier: !modalCheckBox.supplier,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Box className="mt-2">
            <SimpleDropdownComponent size="small" />
          </Box>
          <Box className="border-top border-bottom mt-2">
            <Grid container>
              <Grid item sm={4}>
                <CheckBoxComponent
                  label="Push notification"
                  isChecked={messageCheckBox.pushnotification}
                  checkBoxClick={() => {
                    setMessageCheckBox((prv) => ({
                      ...prv,
                      pushnotification: !messageCheckBox.pushnotification,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <CheckBoxComponent
                  label="Email"
                  isChecked={messageCheckBox.email}
                  checkBoxClick={() => {
                    setMessageCheckBox((prv) => ({
                      ...prv,
                      email: !messageCheckBox.email,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <CheckBoxComponent
                  label="Message"
                  isChecked={messageCheckBox.message}
                  checkBoxClick={() => {
                    setMessageCheckBox((prv) => ({
                      ...prv,
                      message: !messageCheckBox.message,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="py-2">
            <Grid container>
              <Grid item sm={4}>
                <RadiobuttonComponent
                  label="Only Attachment"
                  isChecked={selectRadio == "Only Attachment"}
                  onRadioChange={() => {
                    setSelectRadio("Only Attachment");
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <RadiobuttonComponent
                  label="Only Text"
                  isChecked={selectRadio == "Only Text"}
                  onRadioChange={() => {
                    setSelectRadio("Only Text");
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <RadiobuttonComponent
                  label="Text With Attachment"
                  isChecked={selectRadio == "Text With Attachment"}
                  onRadioChange={() => {
                    setSelectRadio("Text With Attachment");
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            {selectRadio == "Only Text" ||
            selectRadio == "Text With Attachment" ? (
              <div className="w-100 overflow-auto hide-scrollbar mb-2">
                <TextEditor
                  className="w-100"
                  placeholder="Type here for push notification"
                />
              </div>
            ) : null}
            {selectRadio == "Only Attachment" ||
            selectRadio == "Text With Attachment" ? (
              <Grid item sm={4}>
                <label
                  htmlFor="pushNotify"
                  className="border-light-orange1 color-orange cursor-pointer fs-14 px-2"
                >
                  Attach File
                </label>
                <label className="fs-12 ms-1">File Name...</label>
                <input type="file" className="d-none" id="pushNotify" />
              </Grid>
            ) : null}
          </Box>
        </Box>
        <Box className="border-top py-2 bg-white d-flex justify-content-end">
          <ButtonComponent
            muiProps="me-2"
            label="Schedule"
            variant="outlined"
          />
          <ButtonComponent muiProps="me-2" label="Cancel" variant="outlined" />
          <ButtonComponent label="Submit" />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default NotificationModal;
