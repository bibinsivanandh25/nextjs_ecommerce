import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { getFAQData } from "services/supplier/helpcenter";
import toastify from "services/utils/toastUtils";

export default function SimpleAccordion() {
  const [masterData, setMasterData] = useState([]);
  const getAllFaqData = async () => {
    const { data, err } = await getFAQData();
    if (data) {
      setMasterData(data);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getAllFaqData();
  }, []);
  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar">
      <div className="mx-5">
        <Typography variant="h6" className="color-orange fw-bold py-2 px-1">
          FAQ
        </Typography>
        {masterData.map((item) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="fw-600">
                {item.helpCenterSubtitle}
              </Typography>
            </AccordionSummary>
            {item.questionAndAnswer.map((val) => (
              <AccordionDetails>
                <Typography className="fw-500">
                  <span className="fw-bold"> Q : </span>
                  {val.question}
                </Typography>
                <Typography className="ms-4">{val.answer}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </div>
    </Paper>
  );
}
