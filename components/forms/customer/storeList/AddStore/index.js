/* eslint-disable no-unused-vars */
import InputBox from "@/atoms/InputBoxComponent";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import ButtonComponent from "@/atoms/ButtonComponent";
import {
  addStore,
  addStoreToStoreList,
  getStoreList,
} from "services/admin/storeList";
import { useSelector } from "react-redux";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";

const filter = createFilterOptions();
const AddStore = ({
  defaultData = { storeCode: "", storeListName: null },
  switchTabs = () => {},
}) => {
  const [formData, setFormData] = useState({
    storeCode: "",
    storeListName: null,
  });
  const [error, setError] = useState({
    storeCode: "",
    storeListName: "",
  });
  // const [storelist, setStoreList] = useState([]);
  const { userId } = useSelector((state) => state.customer);
  const customer = useSelector((state) => state.customer);
  const [options, setOptions] = useState([]);

  const getStoresList = async () => {
    const { data } = await getStoreList(userId, "");
    if (data) {
      setOptions(
        data.map((item) => ({
          title: item.customerStoreListName ?? "--",
          id: item.customerStoreListId,
        }))
      );
    }
  };

  useEffect(() => {
    getStoresList();
  }, []);

  useEffect(() => {
    // if (options.length) {
    setFormData({ ...defaultData });
    // }
  }, [defaultData, options]);

  const validate = () => {
    const errObj = {
      storeCode: "",
      storeListName: "",
    };
    let flag = false;
    if (formData.storeCode === "") {
      errObj.storeCode = validateMessage.field_required;
      flag = true;
    } else if (formData.storeListName.title === "") {
      errObj.storeListName = validateMessage.field_required;
      flag = true;
    }
    if (
      defaultData?.type &&
      !(formData.storeListName?.title || formData.storeListName)
    ) {
      errObj.storeListName = validateMessage.field_required;
      flag = true;
    }
    setError(errObj);
    return flag;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      if (defaultData?.type) {
        const { data, err, message } = await addStoreToStoreList(
          formData.storeCode,
          formData.storeListName?.id ?? 0,
          formData.storeListName?.title ?? formData.storeListName,
          userId
        );
        if (data) {
          toastify(message, "success");
          switchTabs("Store Category", { storeCode: "", storeListName: null });
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        const { data, err, message } = await addStore({
          customerId: userId,
          storeListId: formData.storeListName?.id ?? null,
          storeListName:
            formData.storeListName?.title ?? formData.storeListName,
          storeType: "SUPPLIER",
          storeCode: formData.storeCode,
        });
        if (data) {
          toastify(message, "success");
          if (formData.storeListName?.id) {
            switchTabs("Store Category", {
              storeCode: "",
              storeListName: null,
            });
          } else {
            switchTabs("View All", { storeCode: "", storeListName: null });
          }
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      }
    }
  };

  return (
    <Box className="w-100 p-2 py-4">
      <InputBox
        label="Store Code"
        value={formData.storeCode}
        onInputChange={(e) => {
          setFormData((pre) => ({ ...pre, storeCode: e.target.value }));
        }}
        helperText={error.storeCode}
        error={error.storeCode}
      />
      <Autocomplete
        className="mt-3"
        value={formData.storeListName}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setFormData((pre) => ({ ...pre, storeListName: newValue }));
          } else if (newValue && newValue.inputValue) {
            setFormData((pre) => ({
              ...pre,
              storeListName: newValue.inputValue,
            }));
          } else {
            setFormData((pre) => ({ ...pre, storeListName: newValue }));
          }
        }}
        filterOptions={(option, params) => {
          const filtered = filter(option, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((opt) => inputValue === opt.title);
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Store List"
            error={Boolean(error.storeListName)}
            helperText={error.storeListName}
          />
        )}
        size="small"
      />
      <Box className="d-flex justify-content-center w-100 mt-3">
        <ButtonComponent label="submit" onBtnClick={handleSubmit} />
      </Box>
    </Box>
  );
};
export default AddStore;
