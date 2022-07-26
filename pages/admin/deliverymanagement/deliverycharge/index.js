import { Box } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { useState } from "react";
import TableComponent from "@/atoms/TableWithSpan";
import DeliveryChargesModal from "@/forms/admin/DeliveryManagement/DeliveryCharges";

const DeliveryCharge = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Zone",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },

    {
      label: "Delhivery",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Postal Department",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Dimensions",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 3,
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col2",
      label: "Surface",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col3",
      label: "Air Mode",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Surface",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Air Mode",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Length",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Breadth",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Height",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: "28 may 2021",
      col3: "1",
      col4: "sasdd",
      col5: "sda",
      col6: "asda",
      col7: "sdasd",
      col8: "sadsa",
      col9: (
        <CustomIcon
          type="edit"
          title="Edit"
          onIconClick={() => setShowEditModal(true)}
        />
      ),
    },
    {
      id: "2",
      col1: "1",
      col2: "28 may 2021",
      col3: "1",
      col4: "sasdd",
      col5: "sda",
      col6: "asda",
      col7: "sdasd",
      col8: "sadsa",
      col9: (
        <CustomIcon
          type="edit"
          title="Edit"
          onIconClick={() => setShowEditModal(true)}
        />
      ),
    },
  ];
  return (
    <Box>
      <TableComponent
        tHeadBgColor="bg-gray-1"
        tableRows={[...rows]}
        columns={[...column2]}
        column2={[...column1]}
      />
      {showEditModal ? (
        <DeliveryChargesModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
        />
      ) : null}
    </Box>
  );
};
export default DeliveryCharge;
