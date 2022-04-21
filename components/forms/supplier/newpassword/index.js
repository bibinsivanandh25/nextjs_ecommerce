import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";

const NewPasswordForm = ({
  formValues = {},
  handleSubmit = () => {},
  setFormValues = () => {},
}) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <div style={{ width: "400px" }}>
        <InputBox
          placeholder="Enter your E-Mail Id / Mobile No."
          value={formValues.userId}
          label="E-Mail Id / Mobile No."
          className="w-100 my-2"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              userId: e.target.value,
            }));
          }}
        />
      </div>

      <InputBox
        placeholder="Enter New Password"
        value={formValues.password}
        label="Enter New Password"
        className="w-100 my-2"
        size="small"
        onInputChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />

      <InputBox
        placeholder="Re-enter New Password"
        value={formValues.rePassword}
        label="Re-enter New Password"
        className="w-100 my-2"
        size="small"
        onInputChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            rePassword: e.target.value,
          }));
        }}
      />
      <ButtonComponent
        label="Submit"
        onBtnClick={handleSubmit}
        muiProps={"w-30p mx-auto"}
      />
    </div>
  );
};

export default NewPasswordForm;
