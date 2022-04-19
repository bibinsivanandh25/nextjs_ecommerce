import React from "react";
import ButtonComponent from "./ButtonComponent";
import { Grid } from "@mui/material";

export default function TableFilter({ showdelete = true }) {
  return (
    <Grid
      className="py-2 justify-content-end align-items-center my-2"
      container
      spacing={2}
    >
      {/* <SearchBar animated={true} muiProps="pt-0 my-2" /> */}
      {showdelete && (
        <ButtonComponent
          spacing={2}
          showIcon={true}
          iconName="delete"
          iconSize="17"
          label="Delete"
          iconOrintation="end"
          iconColor="#2748a1"
          muiProps="m-2  py-2 px-3 filter-table-icon"
          variant="text"
        />
      )}
      <ButtonComponent
        spacing={2}
        showIcon={true}
        iconName="filter"
        iconSize="17"
        label="Filter"
        iconOrintation="end"
        iconColor="#2748a1"
        muiProps="m-2  py-2 px-3 filter-table-icon"
        variant="text"
      />
      <ButtonComponent
        showIcon={true}
        iconName="add"
        iconSize="15"
        label="New User"
        muiProps="m-2 py-2 px-3 new-user-btn"
      />
    </Grid>
  );
}
