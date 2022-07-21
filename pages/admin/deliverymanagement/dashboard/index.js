import { Grid, Paper, Typography } from "@mui/material";

const DeliveryDashboard = () => {
  const DeliveryDetails = [
    {
      title: "Total Forward orders paid to logistics",
      value: 25,
      backgroundColor: "#f2f7ff",
      borderColor: "#bdd5fa",
      color: "#5500d4",
    },
    {
      title: "Total Return orders paid to logistics",
      value: 215,
      backgroundColor: "#fffef8",
      borderColor: "#ffeeab",
      color: "#ffd42a",
    },
    {
      title: "Total RTO orders paid to logistics",
      value: 15,
      backgroundColor: "#f1fff7",
      borderColor: "#a6ffca",
      color: "#00c153",
    },
    {
      title: "Total Hand Pick orders ",
      value: 25,
      backgroundColor: "#fff7ff",
      borderColor: "#fccbfc",
      color: "#ff00ff",
    },
    {
      title: "Delivered by store owner",
      value: 88,
      backgroundColor: "#edfeff",
      borderColor: "#a2f6fb",
      color: "#009faa",
    },
  ];

  const getCards = () => {
    return DeliveryDetails.map((ele) => {
      return (
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Paper
            className="px-3 mnh-100 d-flex flex-column justify-content-between"
            sx={{
              background: ele.backgroundColor,
              border: `1px solid ${ele.borderColor}`,
            }}
          >
            <Typography className="text-center h-5 fw-bold">
              {ele.title}
            </Typography>
            <Typography
              className="fw-bold h-1 text-center"
              sx={{
                color: ele.color,
              }}
            >
              {ele.value}
            </Typography>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <div className="mt-1">
      <Grid container justifyContent="space-between" spacing={2}>
        {/* <Grid item sm={1} /> */}
        {getCards()}
        {/* <Grid item sm={1} /> */}
      </Grid>
    </div>
  );
};
export default DeliveryDashboard;
