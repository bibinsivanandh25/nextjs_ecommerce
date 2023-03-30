import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ArrowDropDown } from "@mui/icons-material";
import { getCustomerHelpCenter } from "services/customer/helpCenter";
import toastify from "services/utils/toastUtils";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ButtonComponent from "@/atoms/ButtonComponent";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowDropDown sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  //   backgroundColor:
  //     theme.palette.mode === "dark"
  //       ? "rgba(255, 255, 255, .05)"
  //       : "rgba(0, 0, 0, .03)",
  //   flexDirection: "row-reverse",
  //   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
  //     transform: "rotate(90deg)",
  //   },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("");
  const [HelpCenterData, setHelpCenterData] = useState([]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const getCustomerHelpCenterFunction = async () => {
    const title = "FAQ";
    const userType = "CUSTOMER";
    const { data, errRes } = await getCustomerHelpCenter(title, userType);
    if (data) {
      setHelpCenterData(
        data.map((item) => {
          return {
            ...item,
            questionAndAnswer: item.questionAndAnswer.map((ele) => ({
              ...ele,
              answer:
                "Voluptate minim do esse nisi ea eu. Qui id ad voluptate ipsum reprehenderit pariatur sint duis proident id. Nulla exercitation elit proident non commodo ullamco exercitation consequat mollit quis qui excepteur consequat et.",
              truncate: false,
            })),
          };
        })
      );
    } else if (errRes) {
      toastify(errRes, "error");
    }
  };
  useEffect(() => {
    getCustomerHelpCenterFunction();
  }, []);

  return (
    <div className="mxh-82vh mnh-82vh overflow-auto hide-scrollbar">
      <Typography className="fw-bold fs-5 ms-2 ">FAQ</Typography>
      {HelpCenterData.map((item, idx) => {
        return (
          <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography className="fw-bold">
                {item.helpCenterSubtitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="mxh-400 overflow-y-scroll p-4">
              {item.questionAndAnswer.map((val, ind) => {
                return (
                  <>
                    <Grid>
                      <Grid item lg={12} md={6} className="h-5 mb-2 ">
                        <Typography className="fw-600">
                          <span>Q : </span>
                          {val.question}
                        </Typography>
                      </Grid>

                      <Grid item lg={12} md={6} className="h-5 mb-3">
                        <Typography
                          style={{
                            overflow: "hidden",
                            height: val.truncate ? "" : "24px",
                            paddingLeft: "23px",
                          }}
                        >
                          {val.answer}
                        </Typography>
                        <Grid className="px-2">
                          <ButtonComponent
                            variant="outlined"
                            label={val.truncate ? "See less..." : "See more..."}
                            bgColor="bg-white"
                            textColor="color-gray"
                            borderColor="border-white"
                            onBtnClick={() => {
                              const temp = JSON.parse(
                                JSON.stringify(HelpCenterData)
                              );
                              temp[idx].questionAndAnswer[ind].truncate =
                                !temp[idx].questionAndAnswer[ind].truncate;
                              setHelpCenterData(temp);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid container my={1}>
                      <Grid item xs={1} className="h-5">
                        <Typography className="fw-600">A :</Typography>
                      </Grid>

                      <Grid item xs={10} className="h-5">
                        {val.answer}
                      </Grid>
                    </Grid> */}
                  </>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
