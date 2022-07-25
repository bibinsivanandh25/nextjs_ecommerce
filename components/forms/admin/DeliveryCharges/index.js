import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableWithSpan";

const DeliveryChargesModal = ({
  showModal = false,
  setShowModal = () => {},
}) => {
  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Supplie ID/Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },

    {
      id: "col2",
      label: "COD",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col3",
      label: "Return",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Variations",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 3,
    },
    {
      id: "col7",
      label: "SKU",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col8",
      label: "Stock",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Order Received",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      id: "col11",
      label: "Sale Price",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col12",
      label: "Price to customer/Reseller(Actual Cost)",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col13",
      label: "Price to customer/Reseller(Free Delivery)",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col14",
      label: "Last Updated Date & Time",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col15",
      label: "Actions",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col4",
      label: "Size",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Color",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Type",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Actual",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Free Delivery",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: 1,
      col1: "1",
      col2: "28 may 2021",
      col3: "1",
      col4: "sasdd",
      col5: "sda",
      col6: "asda",
      col7: "sdasd",
      col8: "sadsa",
    },
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
    },
  ];

  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalWidth={1300}
      ModalTitle="Edit Product"
      titleClassName="color-orange h-5 fw-bolds"
    >
      <TableComponent
        showCheckbox={false}
        tHeadBgColor="bg-gray-1"
        tableRows={[...rows]}
        columns={[...column2]}
        column2={[...column1]}
      />
    </ModalComponent>
  );
};
export default DeliveryChargesModal;
