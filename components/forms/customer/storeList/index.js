/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { useState, useRef, useCallback, useEffect } from "react";
import { registerCustomer } from "services/customer/auth";
import { useStoreList } from "services/hooks";

const cb = () => {
  return new Promise((resolve, reject) => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push(Math.floor(Math.random() * 10));
    }
    setTimeout(() => {
      resolve(temp);
    }, 2000);
  });
};
const StoreList = () => {
  const [pageNum, setPageNum] = useState(1);
  const { loading, error, list, hasMore } = useStoreList(cb, pageNum);
  const observer = useRef();
  const lastStore = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="mxh-500 overflow-y-scroll">
      {list.map((item, index) => {
        if (list.length - 1 === index) {
          return (
            <div
              ref={lastStore}
              style={{ height: "30px" }}
              className="border my-2"
            >
              {item}
            </div>
          );
        }
        return (
          <div style={{ height: "30px" }} className="border my-2">
            {item}
          </div>
        );
      })}
      {loading && <div>Loading</div>}
    </div>
  );
};
export default StoreList;
