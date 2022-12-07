/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import InputBox from "@/atoms/InputBoxComponent";
import { Box } from "@mui/material";
import TabsCard from "components/molecule/TabsCard";
import { storeUserInfo } from "features/customerSlice";
import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStoreList } from "services/hooks";
import AddStore from "./AddStore";
import StoresTab from "./StoresTab";
import ViewAllStore from "./ViewAllStore";

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
  const [storeSearchext, setStoreSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("Store List");
  const [tabList, setTabList] = useState([
    {
      label: "Store List",
      isSelected: true,
    },
    {
      label: "Add Store",
      isSelected: false,
    },
    {
      label: "View All",
      isSelected: false,
    },
  ]);
  const [defaultData, setDefaultData] = useState({
    storeCode: "",
    storeListName: null,
  });
  const { addStore } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
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
  const switchTabs = (tab, data) => {
    setSelectedTab(tab);
    setDefaultData(data);
    const temp = [...tabList];
    temp.forEach((item) => {
      item.isSelected = false;
    });
    temp[temp.findIndex((item) => item.label === tab)].isSelected = true;
    setTabList(temp);
  };

  const getTabUI = () => {
    return selectedTab === "Store List" ? (
      <StoresTab switchTabs={switchTabs} searchText={storeSearchext} />
    ) : selectedTab === "Add Store" ? (
      <AddStore switchTabs={switchTabs} defaultData={defaultData} />
    ) : (
      <ViewAllStore switchTabs={switchTabs} searchText={storeSearchext} />
    );
  };

  useEffect(() => {
    if (addStore) {
      switchTabs("Add Store", {});
      dispatch(storeUserInfo({ addStore: false }));
    }
  }, [addStore]);

  return (
    <Box className="w-100 px-2">
      {selectedTab !== "Add Store" && (
        <InputBox
          placeholder="Search store"
          value={storeSearchext}
          onInputChange={(e) => {
            setStoreSearchText(e.target.value);
          }}
        />
      )}
      <TabsCard
        tabList={tabList}
        onSelect={(index) => {
          const temp = [...tabList];
          temp.forEach((item) => {
            item.isSelected = false;
          });
          temp[index].isSelected = true;
          setTabList(temp);
          setSelectedTab(temp[index].label);
        }}
      />
      {getTabUI()}
      {/* <div className="mxh-500 overflow-y-scroll">
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
      </div> */}
    </Box>
  );
};
export default StoreList;
