/* eslint-disable react/no-array-index-key */
import { Share } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";

const NewLeads = () => {
  const campaigns = [
    {
      campaignType: "Quiz",
      campaignTitle: "Quiz1234",
      startDate: "12/12/2020",
      endDate: "22/12/2020",
    },
    {
      campaignType: "Scratch Card",
      campaignTitle: "Scratch Card1234",
      startDate: "12/12/2020",
      endDate: "22/12/2020",
    },
    {
      campaignType: "spin wheel",
      campaignTitle: "spin wheel1234",
      startDate: "12/12/2020",
      endDate: "22/12/2020",
    },
  ];
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignDetail, setCampaignDetail] = useState([...campaigns]);
  useEffect(() => {
    const temp = [];
    campaignDetail.forEach((ele) => {
      temp.push({
        ...ele,
        isSelected: false,
      });
    });
    setCampaignDetail([...temp]);
  }, []);
  const getCampaigns = () => {
    return campaignDetail.map((ele, index) => {
      return (
        <div
          className="d-flex align-items-center py-3 border-bottom"
          key={index}
        >
          <div>
            <CheckBoxComponent
              isChecked={ele.isSelected}
              id={ele.campaignType}
              checkBoxClick={(id) => {
                const arr = [...campaignDetail];
                arr.forEach((item) => {
                  if (id === item.campaignType) {
                    // eslint-disable-next-line no-param-reassign
                    ele.isSelected = !ele.isSelected;
                  }
                });
                setCampaignDetail([...arr]);
              }}
            />
          </div>
          <div>
            <div className=" d-flex align-items-center text-primary">
              <Typography className="me-4"> {ele.campaignType}</Typography>
              <Typography>{ele.campaignTitle}</Typography>
            </div>
            <div className="d-flex text-secondary">
              <Typography className="h-6 ">
                Start Date:{ele.startDate}
              </Typography>
              <Typography className="h-6 mx-3">
                End Date:{ele.endDate}
              </Typography>
            </div>
          </div>
        </div>
      );
    });
  };
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl No ",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Name",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Mobile Number",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Earned Discount Mode",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Action",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const rows = [
    {
      id: "1",
      col1: 1,
      col2: "Suhil",
      col3: "9875867734",
      col4: "Scratch Card",
      col5: (
        <div className="text-center">
          <Share
            onClick={() => {
              setShowCampaignModal(true);
            }}
          />
        </div>
      ),
    },
    {
      id: "1",
      col1: 1,
      col2: "Balu",
      col3: "7022230923",
      col4: "Scratch Card",
      col5: (
        <div className="text-center">
          <Share
            onClick={() => {
              setShowCampaignModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <Paper className="p-2 mnh-75vh mxh-75vh overflow-auto hide-scrollbar">
      <div>
        <TableComponent
          tableRows={[...rows]}
          columns={[...columns]}
          table_heading="New Leads"
          showCheckbox={false}
        />
        <ModalComponent
          open={showCampaignModal}
          onCloseIconClick={() => {
            setShowCampaignModal(false);
          }}
          ModalTitle="Current running campaigns"
          headerClassName="fs-16"
          footerClassName="justify-content-end"
          showClearBtn={false}
          saveBtnText="Proceed"
        >
          {getCampaigns()}
        </ModalComponent>
      </div>
    </Paper>
  );
};
export default NewLeads;
