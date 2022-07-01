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
  if (path.length && path[path.length - 1].startsWith("[")) {
    const pLength = path.length - 1;
    const str = path[pLength];
    path[pLength] = route.query[`${str.substring(1, str.length - 1)}`];
  }
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
              {item.navigate ? (
                <Link href={`${completePath}`} passHref>
                  <span
                    className={`${
                      path.length === index + 1 ? "color-orange" : ""
                    } fs-14 mx-2 cursor-pointer`}
                  >
                    {paths.find((i) => i.id === item)?.title}
                  </span>
                </Link>
              ) : (
                <span
                  className={`${
                    path.length === index + 1 ? "color-orange" : ""
                  } fs-14 mx-2 cursor-pointer`}
                >
                  {paths.find((i) => i.id === item)?.title}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Grid>
  );
};
export default BreadCrumb;
