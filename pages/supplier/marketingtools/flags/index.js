import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewModal from "@/forms/supplier/marketingtools/flags/viewmodal";
import FlagsEditModal from "@/forms/supplier/marketingtools/flags/flagseditmodal";
import { getAllFlags } from "services/supplier/marketingtools/flags";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";

const tableColumn = [
  {
    label: "Flag Title.",
    id: "col1",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Image",
    id: "col2",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Pixel Ratio",
    id: "col3",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Start Date & Time",
    id: "col4",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "End Date & Time",
    id: "col5",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Status",
    id: "col6",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Action",
    id: "col7",
    minWidth: 100,
    align: "start",
    data_align: "center",
  },
];
const imageData = [
  {
    id: 1,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 2,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 3,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 4,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 5,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 6,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 7,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 8,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 9,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 10,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 1,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 2,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 3,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 4,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 5,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 6,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 7,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 8,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 9,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "MidiMidiMidiMidi",
  },
  {
    id: 10,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 1,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 2,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 3,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 4,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 5,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 6,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 7,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 8,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 9,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "Midi",
  },
  {
    id: 10,
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    title: "MidiMidiMidiMidi",
  },
];
const Flags = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const TableRows = [
    {
      id: 1,
      col1: "Deal of the Day",
      col2: (
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
          layout="responsive"
          width={130}
          height={30}
        />
      ),
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "Active",
      col7: (
        <Box className="d-flex">
          <SwitchComponent label="" size="small" />
          <CustomIcon type="share" className="fs-18 me-2" />
          <CustomIcon
            type="view"
            className="fs-18 me-2"
            onIconClick={() => {
              setViewModalOpen(true);
            }}
          />
          <CustomIcon
            type="edit"
            className="fs-18"
            onIconClick={() => {
              setEditModalOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];
  const { supplierId, storeCode } = useSelector((state) => state.user);

  const mapToTable = (data) => {
    const temp = [];
    data.forEach((item) => {
      temp.push({
        col1: item.flagTitle,
        col2: item.imageUrl ? (
          <Image src={item.imageUrl} height={50} width={50} />
        ) : null,
        col3: "--",
        col4: item.startDate || "--",
        col5: item.endDate || "--",
        col6: item.status || "--",
        col7: (
          <Box className="d-flex">
            <SwitchComponent label="" size="small" />
            <CustomIcon type="share" className="fs-18 me-2" />
            <CustomIcon
              type="view"
              className="fs-18 me-2"
              onIconClick={() => {
                setViewModalOpen(true);
              }}
            />
            <CustomIcon
              type="edit"
              className="fs-18"
              onIconClick={() => {
                setEditModalOpen(true);
              }}
            />
          </Box>
        ),
      });
    });
    setRows(temp);
  };

  const getRows = async () => {
    const { data, err } = await getAllFlags(supplierId, storeCode, pageNumber);
    if (data) {
      mapToTable(data);
    } else {
      toastify(err?.response?.data?.message, "error");
      setRows([]);
    }
  };

  useEffect(() => {
    getRows();
  }, []);

  return (
    <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar p-3">
      <TableComponent
        table_heading="Flags"
        columns={tableColumn}
        tableRows={rows}
        showDateFilter
        tHeadBgColor="bg-tableGray"
        showCheckbox={false}
      />
      {viewModalOpen && (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          imageData={imageData}
        />
      )}
      {editModalOpen && (
        <FlagsEditModal
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
        />
      )}
    </Paper>
  );
};

export default Flags;
