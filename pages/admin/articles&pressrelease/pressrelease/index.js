import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const PressRelease = () => {
  const [tableRows, setTableRows] = useState([]);

  // const [openNewArticleModal, setOpenNewArticleModal] = useState(false);
  // const [openCreateExternalLinkModal, setOpenCreateExternalLinkModal] =
  //   useState(false);

  // const [openCreateArticleModal, setOpenCreateArticleModal] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  // const [tableToggle, seTableToggle] = useState(false);

  const rowsDataObjectsForAdminArticle = [
    {
      id: 1,
      col1: "1",
      col2: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
      col3: "LongLinkLongLinkLongLink",
      col4: "----------",
      col5: "24/12/2021-17.58",
      col6: "Published",
      col8: "--",
    },
  ];

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "S No.",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Media Logo", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Link",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Last Updated Date & Time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Edit") {
      // setOpenCreateArticleModal(true);
    }
  };

  const options = [
    "Edit",
    "Delete",
    "Move to draft",
    <Box className="d-flex align-items-center">
      {!menuToggle ? (
        <Typography>Disable</Typography>
      ) : (
        <Typography>Activate</Typography>
      )}
      <Box className="ms-3">
        <SwitchComponent
          label=""
          ontoggle={() => {
            setMenuToggle(!menuToggle);
          }}
        />
      </Box>
    </Box>,
  ];

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForAdminArticle.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box className="h-30 border d-flex justify-content-center">
              <Image src={val.col2} width="50" objectFit="cover" height="50" />
            </Box>
          </Box>
        ),
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: (
          <Box className="d-flex justify-content-end align-items-center">
            <Box>
              <ButtonComponent
                label="Publish"
                variant="outlined"
                textColor="text-danger"
                borderColor="border-danger"
              />
            </Box>
            <CustomIcon type="view" className="ms-2" />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    theTaleRowsData();
  }, []);

  return (
    <>
      <Box>
        <Box className="px-1 pt-2">
          <Paper
            sx={{ height: "82vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <TableComponent
              table_heading="Press Release"
              columns={tableColumns}
              tHeadBgColor="bg-light-gray"
              showPagination={false}
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilterBtn
              showDateFilter
              dateFilterBtnName="+ Create Article"
              dateFilterBtnClick={() => {
                // setOpenNewArticleModal(true);
              }}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default PressRelease;
