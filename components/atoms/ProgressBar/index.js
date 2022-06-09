/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Progress.module.css";

const ProgressBar = ({ showHeader = true }) => {
  const route = useRouter();
  const steps = [
    {
      label: "Accept & confirm Address",
      path: "acceptandconfirmaddress",
    },
    {
      label: "Generate Invoice & Manifest ",
      path: "generateinvoiceandmanifest",
    },
    {
      label: "Upload Manifest",
      path: "uploadmanifest",
    },
  ];

  return (
    <div className={styles.progresscontainer}>
      {showHeader ? (
        <p className="text-center">
          Kindly Select any of these steps to directly proceed to the steps
        </p>
      ) : null}

      <ul className={styles.progressbar} onClick={() => {}}>
        {steps.map((item, index) => {
          return (
            <li
              className={
                item.path === route.pathname.split("/").pop()
                  ? styles.active
                  : ""
              }
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <Link href={item.path}>
                <span className="cursor-pointer">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProgressBar;

// steps [{label:''}]
