import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";

const RegistrationForm = ({
  formValues = {},
  errorObj = {},
  handleSubmit = () => {},
  setFormValues = () => {},
}) => {
  return (
    <div className="w-70p  d-flex justify-content-center">
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter First Name"
            value={formValues.firstName}
            label="First Name"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                firstName: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.firstName}
            error={errorObj.firstName !== ""}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter Last Name"
            value={formValues.lastName}
            label="Last Name"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                lastName: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.lastName}
            error={errorObj.lastName !== ""}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter your Business Name"
            value={formValues.businessName}
            label="Business Name"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                businessName: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.businessName}
            error={errorObj.businessName !== ""}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter your E-mail ID"
            value={formValues.mail}
            label="E-mail ID"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                mail: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.mail}
            error={errorObj.mail !== ""}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter your Mobile Number"
            value={formValues.mobile}
            label="Mobile Number"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                mobile: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.mobile}
            error={errorObj.mobile !== ""}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <SimpleDropdownComponent
            list={[
              { label: "Bangalore", value: "Bangalore", id: 1 },
              { label: "Mysore", value: "Mysore", id: 3 },
            ]}
            label="Choose City"
            onDropdownSelect={(value) => {
              setFormValues((prev) => ({
                ...prev,
                city: value,
              }));
            }}
            value={formValues.city}
            size="small"
            helperText={errorObj.city}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          {/* <InputBox
            placeholder="Choose your Main Category"
            value={formValues.mainCat}
            label="Select Main Category"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                mainCat: e.target.value,
              }));
            }}
          /> */}
          <SimpleDropdownComponent
            list={[
              { label: "Women", value: "women", id: 1 },
              { label: "Watch", value: "watch", id: 3 },
            ]}
            label="Select Main Category"
            onDropdownSelect={(value) => {
              setFormValues((prev) => ({
                ...prev,
                mainCat: value,
              }));
            }}
            value={formValues.mainCat}
            size="small"
            helperText={errorObj.mainCat}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InputBox
            placeholder="Enter your GSTIN"
            value={formValues.gstin}
            label="GSTIN"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                gstin: e.target.value,
              }));
            }}
            inputlabelshrink
            helperText={errorObj.gstin}
            error={errorObj.gstin !== ""}
          />
        </Grid>
        <Grid container item md={12}>
          <Grid container item md={4}>
            <Grid item md={12} className="fw-700">
              Average Stock Count :
            </Grid>
            <Grid item md={12}>
              <RadiobuttonComponent
                label="<50 Units"
                value="50"
                onRadioChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    stockCount: e.target.value,
                  }));
                }}
                id="stockCount"
                isChecked={formValues.stockCount === "50"}
              />
            </Grid>
            <Grid item md={12}>
              <RadiobuttonComponent
                label="50-200 Units"
                value="50-200"
                onRadioChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    stockCount: e.target.value,
                  }));
                }}
                id="stockCount"
                isChecked={formValues.stockCount === "50-200"}
              />
            </Grid>
            <Grid item md={12}>
              <RadiobuttonComponent
                label=">200 Units"
                value="200"
                onRadioChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    stockCount: e.target.value,
                  }));
                }}
                id="stockCount"
                isChecked={formValues.stockCount === "200"}
              />
            </Grid>
            {errorObj.stockCount !== "" ? (
              <Grid item md={12}>
                <Typography className="color-error h-5">
                  {errorObj.stockCount}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid container item md={4}>
            <Grid item md={12} className="fw-700">
              Which website do you sell on?
            </Grid>
            <Grid item md={12}>
              <CheckBoxComponent
                label="Amazon"
                isChecked={formValues.site === "Amazon"}
                checkBoxClick={() => {
                  setFormValues((prev) => ({
                    ...prev,
                    site: "Amazon",
                  }));
                }}
                size="medium"
              />
            </Grid>
            <Grid item md={12}>
              <CheckBoxComponent
                label="Flipkart"
                isChecked={formValues.site === "Flipkart"}
                checkBoxClick={() => {
                  setFormValues((prev) => ({
                    ...prev,
                    site: "Flipkart",
                  }));
                }}
                size="medium"
              />
            </Grid>
            <Grid item md={12}>
              <CheckBoxComponent
                label="Others"
                isChecked={formValues.site === "Others"}
                checkBoxClick={() => {
                  setFormValues((prev) => ({
                    ...prev,
                    site: "Others",
                  }));
                }}
                size="medium"
              />
            </Grid>
            {errorObj.site !== "" ? (
              <Grid item md={12}>
                <Typography className="color-error h-5">
                  {errorObj.site}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid container item md={4}>
            <div className="d-flex w-100 h-100 align-items-end">
              <InputBox
                placeholder="Please provide a link of your website"
                value={formValues.siteLink}
                label=""
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    siteLink: e.target.value,
                  }));
                }}
                variant="standard"
                InputProps={{
                  style: { fontSize: "12px" },
                }}
                inputlabelshrink
                helperText={errorObj.siteLink}
                error={errorObj.siteLink !== ""}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <div className="d-flex flex-row-reverse mt-4 mb-2">
            <ButtonComponent label="Register" onBtnClick={handleSubmit} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrationForm;
