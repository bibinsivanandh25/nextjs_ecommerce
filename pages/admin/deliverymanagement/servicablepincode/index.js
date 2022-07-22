import CheckIcon from "@mui/icons-material/Check";
import CustomIcon from "services/iconUtils";
import { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import FileUploadModal from "@/atoms/FileUpload";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const ServicablePinCode = () => {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl.No",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Pincode",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Delhivery",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Postal Department",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Actions",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "01",
      col2: "577245",
      col3: <CheckIcon className="text-success" />,
      col4: <CheckIcon className="text-success" />,
      col5: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" />
          <CustomIcon
            type="edit"
            className="mx-2"
            onIconClick={() => setShowEditModal(true)}
          />
          <CustomIcon type="delete" />
        </div>
      ),
    },
    {
      id: "2",
      col1: "02",
      col2: "577245",
      col3: <CheckIcon className="text-success" />,
      col4: <CheckIcon className="text-success" />,
      col5: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" />
          <CustomIcon
            type="edit"
            className="mx-2"
            onIconClick={() => setShowEditModal(true)}
          />
          <CustomIcon type="delete" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-end my-2">
        <ButtonComponent
          label="Add Bulk"
          variant="outlined"
          muiProps="mx-2"
          onBtnClick={() => setShowFileUploadModal(true)}
        />
        <ButtonComponent label="Add Individual" />
      </div>
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        showSearchFilter={false}
        showSearchbar={false}
      />
      <FileUploadModal
        showModal={showFileUploadModal}
        setShowModal={setShowFileUploadModal}
      />
      <ModalComponent
        open={showEditModal}
        onCloseIconClick={() => setShowEditModal(false)}
        ModalTitle="Edit"
        footerClassName="justify-content-start flex-row-reverse "
        ClearBtnText="Cancel"
        saveBtnText="Submit"
        saveBtnClassName="mx-2"
        titleClassName="h-5 fw-bold color-orange"
      >
        <div className="my-2">
          <SimpleDropdownComponent label="Pincode" size="small" />
          <SimpleDropdownComponent
            label="Delivery Partner"
            size="small"
            className="my-3"
          />
        </div>
      </ModalComponent>
    </div>
  );
};
export default ServicablePinCode;
