import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import InputBox from "@/atoms/InputBoxComponent";

const TableHeaderColumn = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    minWidth: 50,
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "To Whom",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Total Supplier / Reseller / Customer / Logistics",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Total Orders",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Amount Payable",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Payment date",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col7",
    align: "center",
    label: "Payment initiation done by",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col8",
    align: "center",
    label: "Comments",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col9",
    align: "center",
    label: "Status",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col10",
    align: "center",
    label: "Action",
    minWidth: 150,
    data_align: "center",
  },
];

const InitiatePayment = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({
    selectwhom: "",
    id: "",
    amount: "",
  });
  const [formData, setFormData] = useState({
    selectwhom: {},
    id: "",
    amount: "",
  });
  const getTableData = () => {
    const data = [
      {
        id: "col1",
        col1: "1",
        col2: "Reseller",
        col3: (
          <span className="h-5 color-blue text-decoration-underline cursor-pointer">
            34
          </span>
        ),
        col4: (
          <span className="h-5 color-blue text-decoration-underline cursor-pointer">
            44
          </span>
        ),
        col5: "4500",
        col6: "12/09/2022",
        col7: (
          <>
            <Typography className="h-5 color-blue text-decoration-underline cursor-pointer">
              #15689557
            </Typography>
            <Typography className="h-5">By Balu</Typography>
          </>
        ),
        col8: "Test",
        col9: "Pending",
        col10: (
          <Box display="flex" justifyContent="center">
            <Box
              sx={{
                background: "#FFFFFF",
                boxShadow: "0px 3px 6px #00000029",
                opacity: 1,
                width: "26px",
                height: "26px",
                borderRadius: "50%",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginRight={2}
            >
              <CustomIcon type="chatBubbleIcon" className="fs-20" />
            </Box>{" "}
            <Box
              sx={{
                background: "#FFFFFF",
                boxShadow: "0px 3px 6px #00000029",
                opacity: 1,
                width: "26px",
                height: "26px",
                borderRadius: "50%",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CustomIcon type="attachMoneyOutlinedIcon" className="fs-20" />
            </Box>
          </Box>
        ),
      },
    ];
    setRows(data);
  };
  useEffect(() => {
    getTableData();
  }, []);
  const handleSaveClick = () => {
    const errorObj = {
      selectwhom: "",
      id: "",
      amount: "",
    };
    let flag = true;
    const { selectwhom, id, amount } = formData;
    if (Object?.keys(selectwhom)?.length === 0) {
      flag = false;
      errorObj.selectwhom = validateMessage.field_required;
    }
    if (id?.length === 0) {
      flag = false;
      errorObj.id = validateMessage.field_required;
    }
    const reg = new RegExp("^\\d+$");
    if (amount.length === 0) {
      flag = false;
      errorObj.amount = validateMessage.field_required;
    } else if (!reg.test(amount)) {
      errorObj.amount = "Only numeric characters can be entered";
    }
    setError(errorObj);
    if (flag) {
      setModalOpen(false);
    }
  };
  const handleCloseClick = () => {
    setError({
      selectwhom: "",
      id: "",
      amount: "",
    });
    setFormData({ selectwhom: {}, id: "", amount: "" });
    setModalOpen(false);
  };
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box display="flex" justifyContent="space-between" paddingX={3}>
        <Typography className="h-4 color-orange fw-bold">
          Initiate Payment
        </Typography>
        <ButtonComponent
          label="Create Payment"
          onBtnClick={() => {
            setModalOpen(true);
          }}
        />
      </Box>
      <TableComponent
        columns={[...TableHeaderColumn]}
        showSearchFilter={false}
        showSearchbar={false}
        tHeadBgColor="bg-light-gray"
        tableRows={[...rows]}
      />
      <ModalComponent
        open={modalOpen}
        onCloseIconClick={() => {
          handleCloseClick();
        }}
        footerClassName="justify-content-end"
        saveBtnText="Initiate Payment"
        ClearBtnText="Cancel"
        ModalTitle="Create Payment"
        onSaveBtnClick={() => {
          handleSaveClick();
        }}
        onClearBtnClick={() => {
          handleCloseClick();
        }}
      >
        <Box className="p-3">
          <SimpleDropdownComponent
            value={formData.selectwhom}
            label="Select Whom"
            inputlabelshrink
            size="small"
            onDropdownSelect={(value) => {
              if (value) {
                setFormData((pre) => ({ ...pre, selectwhom: value }));
              }
            }}
            error={error.selectwhom !== ""}
            helperText={error.selectwhom && error.selectwhom}
          />
          <InputBox
            value={formData.id}
            label="Search By ID"
            inputlabelshrink
            className="my-3"
            onInputChange={(e) => {
              setFormData((pre) => ({ ...pre, id: e.target.value }));
            }}
            error={error.id !== ""}
            helperText={error.id && error.id}
          />
          <InputBox
            value={formData.amount}
            label="Enter Amount"
            inputlabelshrink
            onInputChange={(e) => {
              setFormData((pre) => ({ ...pre, amount: e.target.value }));
            }}
            error={error.amount !== ""}
            helperText={error.amount && error.amount}
          />
        </Box>
      </ModalComponent>
    </Paper>
  );
};

export default InitiatePayment;
