import InputBox from "components/atoms/InputBoxComponent";
import { useRef } from "react";

const OtpForm = ({ otp = "xxxx", setotp = () => {} }) => {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const thirdInputRef = useRef();
  const fourthInputRef = useRef();
  return (
    <div className="d-flex justify-content-evenly w-250px mx-auto mb-3 mt-4">
      <div
        className={`shadow rounded p-2 px-3 `}
        style={{ width: "40px", height: "40px" }}
      >
        <InputBox
          variant="standard"
          type="number"
          className="w-100"
          inputRef={firstInputRef}
          onInputChange={(e) => {
            if (e.target.value !== "") secondInputRef.current.focus();
            // const temp = e.target.value + otp.slice(1, 4);
            // setotp(temp);
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 8 || e.keyCode == 46) {
              const temp = `x${otp.slice(1, 4)}`;
              setotp(temp);
            } else if (e.keyCode >= 48 && e.keyCode <= 57) {
              // thirdInputRef.current.focus();
              const temp = String.fromCharCode(e.keyCode) + otp.slice(1, 4);
              setotp(temp);
              // secondInputRef.current.focus();
            }
          }}
          value={otp.charAt(0) === "x" ? "" : otp.charAt(0)}
        />
      </div>
      <div
        className={`shadow rounded p-2 px-3 `}
        style={{ width: "40px", height: "40px" }}
      >
        <InputBox
          variant="standard"
          type="number"
          className="w-100"
          inputRef={secondInputRef}
          onInputChange={(e) => {
            // debugger;
            if (e.target.value !== "") thirdInputRef.current.focus();
            // const temp = otp.slice(0, 1) + e.target.value + otp.slice(2, 4);
            // setotp(temp);
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 8 || e.keyCode == 46) {
              if (otp.charAt(1) === "x") {
                firstInputRef.current.focus();
              } else {
                const temp = `${otp.slice(0, 1)}x${otp.slice(2, 4)}`;
                setotp(temp);
              }
            } else if (e.keyCode >= 48 && e.keyCode <= 57) {
              // thirdInputRef.current.focus();
              const temp =
                otp.slice(0, 1) +
                String.fromCharCode(e.keyCode) +
                otp.slice(2, 4);
              setotp(temp);
            }
          }}
        />
      </div>
      <div
        className={`shadow rounded p-2 px-3 `}
        style={{ width: "40px", height: "40px" }}
      >
        <InputBox
          variant="standard"
          type="number"
          className="w-100"
          inputRef={thirdInputRef}
          onInputChange={(e) => {
            if (e.target.value !== "") fourthInputRef.current.focus();
            // const temp = otp.slice(0, 2) + e.target.value + otp.slice(3, 4);
            // setotp(temp);
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 8 || e.keyCode == 46) {
              if (otp.charAt(2) === "x") {
                secondInputRef.current.focus();
              } else {
                const temp = `${otp.slice(0, 2)}x${otp.slice(3, 4)}`;
                setotp(temp);
              }
            } else if (e.keyCode >= 48 && e.keyCode <= 57) {
              // fourthInputRef.current.focus();
              const temp =
                otp.slice(0, 2) +
                String.fromCharCode(e.keyCode) +
                otp.slice(3, 4);
              setotp(temp);
            }
          }}
        />
      </div>
      <div
        className={`shadow rounded p-2 px-3 `}
        style={{ width: "40px", height: "40px" }}
      >
        <InputBox
          variant="standard"
          type="number"
          className="w-100"
          inputRef={fourthInputRef}
          // onInputChange={(e) => {
          //   const temp = otp.slice(0, 3) + e.target.value;
          //   setotp(temp);
          // }}
          onKeyDown={(e) => {
            if (e.keyCode == 8 || e.keyCode == 46) {
              if (otp.charAt(3) === "x") {
                thirdInputRef.current.focus();
              } else {
                const temp = `${otp.slice(0, 3)}x`;
                setotp(temp);
              }
            } else if (e.keyCode >= 48 && e.keyCode <= 57) {
              const temp = otp.slice(0, 3) + String.fromCharCode(e.keyCode);
              setotp(temp);
            }
          }}
        />
      </div>
    </div>
  );
};

export default OtpForm;
