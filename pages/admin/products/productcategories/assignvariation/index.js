import CreateCategories from "@/forms/admin/productcategories/categories/CreateCategories";
import { Paper } from "@mui/material";

const AssignVariation = () => {
  return (
    <Paper sx={{ height: "84vh" }} className="overflow-auto hide-scrollbar">
      <CreateCategories />
    </Paper>
  );
};
export default AssignVariation;
