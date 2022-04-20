import styles from "./Progress.module.css";
const ProgressBar = ({ steps = [], activeStep = 1, showHeader = false }) => {
  return (
    <div className={styles.progresscontainer}>
      {showHeader ? (
        <p className="text-center">
          Kindly Select any of these steps to directly proceed to the steps
        </p>
      ) : null}
      <ul className={styles.progressbar}>
        {steps.map((item, index) => {
          return (
            <li
              className={activeStep === index + 1 ? styles.active : ""}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProgressBar;

//steps [{label:''}]
