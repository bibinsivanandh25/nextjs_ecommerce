import Rating from "@mui/material/Rating";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validateMessage from "constants/validateMessages";
import { useState } from "react";

const RateMrMrsCartForm = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState({});

  const validateForm = () => {
    const errObj = { ...error };
    if (!value) {
      errObj.star = validateMessage.field_required;
    } else {
      errObj.star = null;
    }
    if (!comment) {
      errObj.comment = validateMessage.field_required;
    } else {
      errObj.comment = null;
    }
    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      console.log(comment);
    }
  };

  return (
    <>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size="large"
        className="mt-2"
      />
      {error.star && (
        <p className="error" id="textbox-helper-text">
          {error.star}
        </p>
      )}
      <InputBox
        isMultiline
        placeholder="Please enter your comments about MrMrsCart here....."
        className="mt-4"
        value={comment}
        onInputChange={(e) => setComment(e.target.value)}
      />
      {error.comment && (
        <p className="error" id="textbox-helper-text">
          {error.comment}
        </p>
      )}
      <div className="d-flex justify-content-end my-2">
        <ButtonComponent label="Submit" onBtnClick={handleSubmitClick} />
      </div>
    </>
  );
};

export default RateMrMrsCartForm;
