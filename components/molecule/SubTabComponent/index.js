import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import BadgeComponent from "../BadgeComponent";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    height: "5px",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    height: "5px",
    borderRadius: 5,
    backgroundColor: "#e56700",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1),
    color: "gray",
    "&.Mui-selected": {
      color: "black",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function CustomizedTabs({ tabList = [] }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mb: 1, borderBottom: 1, borderColor: "divider" }}>
      <Box sx={{ pl: 10 }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {tabList.map((o, index) => (
            <StyledTab
              label={
                <Grid container>
                  <Grid item>
                    <Typography className={value === index && "fw-600"}>
                      {o.label}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <BadgeComponent
                      count={o.count}
                      color={value === index ? "black" : "gray"}
                    />
                  </Grid>
                </Grid>
              }
              key={o.label}
            />
          ))}
        </StyledTabs>
      </Box>
    </Box>
  );
}
