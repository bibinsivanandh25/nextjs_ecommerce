import React from "react";

const SignIn = () => {
  return (
    <Box
      className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Paper
        className="w-400px rounded-1"
        sx={{ background: "rgba(1,1,1,0.4)" }}
        elevation={6}
      >
        <Box className="w-100 p-2 rounded-1"></Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
