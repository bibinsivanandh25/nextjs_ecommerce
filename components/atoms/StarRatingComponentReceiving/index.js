import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "./StarRatingComponentReceiving.module.css";

const StarRatingComponentReceivingRating = ({ rating }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const theRating = rating.toString();
    const ratingArray = theRating.split(".");
    // eslint-disable-next-line radix
    const fullStars = parseInt(ratingArray[0]);
    const hStars = [];

    if (fullStars > 0 && fullStars <= 5) {
      if (ratingArray.length > 1) {
        for (let i = 1; i <= fullStars; i += 1) {
          hStars.push(<StarIcon className={styles.primaryColor} />);
        }
        hStars.push(<StarHalfIcon className={styles.primaryColor} />);

        for (let i = fullStars + 2; i <= 5; i += 1)
          hStars.push(<StarBorderIcon className={styles.primaryColor} />);

        setStars([...hStars]);
      } else {
        for (let i = 0; i < fullStars; i += 1)
          hStars.push(<StarIcon className={styles.primaryColor} />);

        for (let i = fullStars + 1; i <= 5; i += 1)
          hStars.push(<StarBorderIcon className={styles.primaryColor} />);

        setStars([...hStars]);
      }
    }
  }, [rating]);

  return (
    <>
      {stars?.map((val) => {
        return val;
      })}
    </>
  );
};

export default StarRatingComponentReceivingRating;