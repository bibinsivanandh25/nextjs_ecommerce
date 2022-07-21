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
        className={`w-100 overflow-y-scroll hide-scrollbar ${styles.tabContainer}`}
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
              } shadow`}
              onClick={() => {
                onSelect(index);
              }}
              style={{
                backgroundColor: item.isSelected ? "white" : tabBackground,
              }}
            >
              <span style={{ zIndex: 1000 }}>{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="bg-white shadow">{children}</div>
    </div>
  );
};

export default TabsCard;
