import { Share } from "@mui/icons-material";
import { Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";

const OldLeads = () => {
  let campaigns = [
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
    let temp = [];
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
                let arr = [...campaignDetail];
                arr.map((item) => {
                  if (id === item.campaignType) {
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

  return (
    <div>
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        table_heading="Old Leads"
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
  );
};
export default OldLeads;
