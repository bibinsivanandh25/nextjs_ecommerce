/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import styles from "./TabModalComponent.module.css";

const TabModalComponent = ({
  children,
  tabList = [],
  onSelect = () => {},
  open = false,
  close = () => {},
  width = 1000,
}) => {
  // return (
  //   <div>
  //     <div className={styles.backgroundStyle} />
  //     <div className={styles.modalStyle} style={{ width: ModalWidth }}>
  //       <div
  //         className={`w-100 overflow-y-scroll hide-scrollbar ${styles.tabContainer}`}
  //       >
  //         {tabList.map((item, index) => {
  //           return (
  //             <div
  //               className={`${
  //                 item.isSelected
  //                   ? index === 0
  //                     ? styles.firstActiveTab
  //                     : index === tabList.length - 1
  //                     ? styles.lastActiveTab
  //                     : styles.activeTab
  //                   : styles.tabStyle
  //               }`}
  //               onClick={() => {
  //                 onSelect(index);
  //               }}
  //             >
  //               <span style={{ zIndex: 1000 }}>{item.label}</span>
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <div className="w-100 h-100">{children}</div>
  //     </div>
  //   </div>
  // );
  return (
    <ModalComponent
      open={open}
      ModalWidth={width}
      ModalTitle=""
      showHeader={false}
      showFooter={false}
      borderRadius="0px 0px 10px 10px;"
    >
      <Box>
        <div
          className={`overflow-x-scroll hide-scrollbar ${styles.tabContainer}`}
          style={{
            width,
            overflowX: "scroll",
          }}
        >
          {tabList.map((item, index) => {
            return (
              <div
                className={`cursor-pointer ${
                  item.isSelected
                    ? index === 0
                      ? styles.firstActiveTab
                      : index === tabList.length - 1
                      ? styles.lastActiveTab
                      : styles.activeTab
                    : styles.tabStyle
                }`}
                onClick={() => {
                  onSelect(index, item);
                }}
              >
                <Typography
                  style={{
                    zIndex: 1000,
                    width: item.tabWidth ? item.tabWidth : "auto",
                  }}
                  className="h-5 cursor-pointer"
                >
                  {item.label}
                </Typography>
              </div>
            );
          })}
        </div>
        <Box
          style={{
            position: "absolute",
            top: -40,
            right: -12,
            zIndex: 10000,
            backgroundColor: "#fff",
            borderRadius: "50%",
          }}
        >
          <CustomIcon
            type="close"
            title="close"
            showColorOnHover={false}
            color="theme_color"
            onIconClick={() => {
              close();
            }}
          />
        </Box>
        <Box style={{ zIndex: 10000 }}>{children}</Box>
      </Box>
    </ModalComponent>
  );
};
export default TabModalComponent;
