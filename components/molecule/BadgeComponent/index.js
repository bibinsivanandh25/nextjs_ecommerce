import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    alignItems: "center",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function BadgeComponent({ count, color }) {
  return (
    <StyledBadge
      badgeContent={count}
      sx={{
        "& .MuiBadge-badge": {
          color: "white",
          backgroundColor: color,
        },
        ml: 1.5,
      }}
    />
  );
}
