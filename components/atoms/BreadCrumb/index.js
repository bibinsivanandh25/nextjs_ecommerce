import { Grid } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BreadCrumb = () => {
  const route = useRouter();
  let completePath = "/";
  const path =
    route.pathname.substring(1) === ""
      ? []
      : route.pathname.substring(1).split("/");
  return (
    <Grid container item xs={12}>
      <div className="d-flex align-items-center">
        <Link href={"/"}>
          <HomeIcon className="text-secondary mx-2" />
        </Link>
        {path.map((item, index) => {
          completePath =
            completePath === "/"
              ? `${completePath}${item}`
              : `${completePath}/${item}`;
          return (
            <React.Fragment key={index}>
              <span>
                <ArrowForwardIosIcon className="fs-12 mx-2" />
              </span>
              <Link href={`${completePath}`} className="">
                <span
                  className={`${
                    path.length === index + 1 ? "color-orange" : ""
                  } fs-14 mx-2`}
                >
                  {item}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </Grid>
  );
};
export default BreadCrumb;
