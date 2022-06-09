import { Grid } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomIcon from "services/iconUtils";
import { paths } from "./paths";

const BreadCrumb = () => {
  const route = useRouter();
  let completePath = "/supplier";
  const path =
    route.pathname.substring(1) === ""
      ? []
      : route.pathname.substring(1).split("/");
  path.splice(0, 1);

  return (
    <Grid container item xs={12}>
      <div className="d-flex align-items-center">
        <Link href="/" passHref>
          <CustomIcon type="home" />
        </Link>
        {path.map((item, index) => {
          completePath =
            completePath === "/"
              ? `${completePath}${item}`
              : `${completePath}/${item}`;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              <span>
                <CustomIcon type="arrowforward" className="fs-12 mx-2" />
              </span>
              <Link href={`${completePath}`} passHref>
                <span
                  className={`${
                    path.length === index + 1 ? "color-orange" : ""
                  } fs-14 mx-2`}
                >
                  {paths.find((i) => i.id === item)?.title}
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
