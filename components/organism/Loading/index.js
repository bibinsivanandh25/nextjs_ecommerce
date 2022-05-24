// import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ showSpinner: false });

const Loading = () => {
  useEffect(() => {
    Router.onRouteChangeStart = () => {
      NProgress.start();
    };

    Router.onRouteChangeComplete = () => {
      NProgress.done();
    };

    Router.onRouteChangeError = () => {
      NProgress.done();
    };
  });
};

export default Loading;
