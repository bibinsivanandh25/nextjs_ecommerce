import CustomIcon from "services/iconUtils";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const DeliveryPartners = () => {
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl.No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Partner Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Contact No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Address",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "website",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Tracking URL",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Action",
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
      col1: "1",
      col2: "VRL",
      col3: "898989787",
      col4: "askljh",
      col5: "http://",
      col6: "http://",
      col7: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" title="view" />
          <CustomIcon
            type="edit"
            title="edit"
            className="mx-2"
            // onIconClick={() => setShowEditModal(true)}
          />
          <CustomIcon type="delete" title="delete" />
          <div className="ms-4">
            <SwitchComponent label="" />
          </div>
        </div>
      ),
    },
    {
      id: "2",
      col1: "1",
      col2: "VRL",
      col3: "898989787",
      col4: "askljh",
      col5: "http://",
      col6: "http://",
      col7: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" title="view" />
          <CustomIcon
            type="edit"
            title="edit"
            className="mx-2"
            // onIconClick={() => setShowEditModal(true)}
          />
          <CustomIcon type="delete" title="delete" />
          <div className="ms-4">
            <SwitchComponent label="" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end me-2">
        <ButtonComponent label="Create New Partner" />
      </div>
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        showSearchbar={false}
        tHeadBgColor="bg-gray-1"
      />
    </div>
  );
};
export default DeliveryPartners;
