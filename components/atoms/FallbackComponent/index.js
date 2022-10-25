import Image from "next/image";

const { Typography } = require("@mui/material");

const FallbackComponent = () => {
  return (
    <div
      className="w-100 mnh-100vh d-flex justify-content-center align-items-center bg-white"
      style={{
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <Image
        src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/image_2022_10_21T12_34_45_035Z.png"
        width={400}
        height={500}
      />
      <div className="">
        <Typography
          className=""
          style={{
            fontSize: "80px",
          }}
        >
          401
        </Typography>
        <Typography
          className=""
          style={{
            fontSize: "30px",
          }}
        >
          Authorization Required
        </Typography>
        <Typography
          className=""
          style={{
            fontSize: "18px",
          }}
        >
          Please contact your administrator since your account has been
          suspended.
        </Typography>
      </div>
    </div>
  );
};

export default FallbackComponent;
