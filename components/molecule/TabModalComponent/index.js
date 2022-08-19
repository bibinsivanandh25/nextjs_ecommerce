/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import styles from "./TabModalComponent.module.css";

const TabModalComponent = ({
  children,
  tabList = [],
  // minWidth,
  ModalWidth = 500,
  onSelect = () => {},
}) => {
  return (
    <div>
      <div className={styles.backgroundStyle} />
      <div className={styles.modalStyle} style={{ width: ModalWidth }}>
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
                }`}
                onClick={() => {
                  onSelect(index);
                }}
              >
                <span style={{ zIndex: 1000 }}>{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="w-100 h-100">{children}</div>
      </div>
    </div>
  );
};
export default TabModalComponent;
