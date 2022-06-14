/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import styles from "./StarRatingComponent.module.css"

const SingleStar = ({filled, index, setChangeStars, changeStars}) => {



    const fillStars = ()=>{

        // if (!changeStars[0])
        // setShowClear(true);

        const updatedArray = [];
        for (let i=0;i<=4;i++)
        {
            if (i<=index)
            updatedArray.push(true);
            else
            updatedArray.push(false);
        }
        setChangeStars([...updatedArray]);
    }

    const unFillStars = ()=>{
        const updatedArray = [...changeStars];
        if (updatedArray[index+1]===true){
            for (let i=4;i>index;i--){
                updatedArray.splice(i,1,false);
                setChangeStars([...updatedArray]);
            }
        }
    }

    return filled ? <StarIcon className={styles.primaryColor}
    onClick={unFillStars}
    />:<StarBorderIcon className={styles.primaryColor}  onClick={fillStars}/>
}

const StarRatingComponent = ({clearAllStars=()=>{}}) => {
    const [changeStars, setChangeStars] = useState([false, false, false,false,false]);
    // States for clearing the stars
    // const [showClear, setShowClear] = useState(false);
    const keys = ["1","2","3","4","5"];

    // Logic for clear all stars
    //-------------------------------------------
    // const clearAllStars = ()=>{
    //     setChangeStars((stars)=>{
    //         const clearedArray = stars.map(()=>{
    //             return false;
    //         })
    //         return clearedArray;
    //     })
    //     setShowClear(false);
    // }

return (<div>

    {changeStars.map((val, index)=>{
        return <SingleStar key={keys[index]} filled={val} index={index} setChangeStars={setChangeStars}
        changeStars={changeStars}
        
        />
    })}
    {/* Clear Button */}
    {/* {showClear && <p className="ms-2"
    onClick={()=>{
        clearAllStars();
    }}
    >Clear</p>} */}
</div>)

}

export default StarRatingComponent;