import styles from "./Progress.module.css";
const ProgressBar = ({ steps = [], activeStep = 1 }) => {
  return (
    <div className={styles.progresscontainer}>
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
