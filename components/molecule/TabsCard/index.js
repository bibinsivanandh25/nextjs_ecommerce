/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import styles from "./TabsCard.module.css";

const TabsCard = ({
  tabList = [],
  onSelect = () => {},
  children,
  tabBackground = "#f0f0f0",
}) => {
  return (
    <div>
      <div
        className={`w-100 hide-scrollbar pt-2 ${styles.tabContainer}`}
        style={{ overflowY: "hidden" }}
      >
        {tabList.map((item, index) => {
          return (
            <div
              className={`${
                item.isSelected
                  ? index === 0
                    ? styles.firstActiveTab
                    : index === tabList.length - 1
                    ? styles.lastActiveTab
                    : styles.activeTab
                  : styles.tabStyle
              }`}
              onClick={() => {
                onSelect(index);
              }}
              style={{
                backgroundColor: item.isSelected ? "white" : tabBackground,
              }}
            >
              <span style={{ zIndex: 1000 }} className="cursor-pointer">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="bg-white shadow">{children}</div>
    </div>
  );
};

export default TabsCard;
