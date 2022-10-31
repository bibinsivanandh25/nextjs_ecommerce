import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCustomerList,
  getMediaUrl,
  helpandSupportTicket,
} from "services/admin/help&support";
import toastify from "services/utils/toastUtils";

const CreateTicket = ({
  setShowCreateTicketComponent = () => {},
  getTabledata = () => {},
}) => {
  const [mediaConverted, setMediaConverted] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  // const inputField = useRef();
  const customerListData = async () => {
    const { data } = await getCustomerList();
    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          id: ele.id,
          label: ele.name,
          value: ele.value,
        });
        setCustomerList([...result]);
      });
    }
  };

  useEffect(() => {
    customerListData();
  }, []);

  const issueTypes = [
    {
      id: "ORDER_RELATED_ISSUE",
      label: "Order Related Issue",
      value: "ORDER_RELATED_ISSUE",
    },
    {
      id: "RETURN_AND_REFUND",
      label: "Return and Refund",
      value: "RETURN_AND_REFUND",
    },
    {
      id: "LOGISTICS_RELATED_ISSUE",
      label: "Logistic Related Issue",
      value: "LOGISTICS_RELATED_ISSUE",
    },
    {
      id: "CANCELLATION_AND_REFUND",
      label: "Cancellation and Refund",
      value: "CANCELLATION_AND_REFUND",
    },
    {
      id: "PROFILE_RELATED_ISSUE",
      lable: "Profile Related Issue",
      value: "PROFILE_RELATED_ISSUE",
    },
    {
      id: "PAYMENT_SETTLEMENT_ISSUE",
      label: "Payment Settlement",
      value: "PAYMENT_SETTLEMENT_ISSUE",
    },
    {
      id: "ACCOUNT_MANAGEMENT_ISSUE",
      label: "Account Management Issue",
      value: "ACCOUNT_MANAGEMENT_ISSUE",
    },
    {
      id: "OTHERS",
      label: "Others",
      value: "OTHERS",
    },
  ];
  // const route = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formValue, setFormValue] = useState({
    issueType: {},
    OrderID: "",
    subject: "",
    content: "",
    userToId: "",
  });
  const [errorObj, setErrorObj] = useState({
    issueType: "",
    subject: "",
    content: "",
  });
  const [orderIdDisplay, setorderIdDisplay] = useState(false);
  useEffect(() => {
    if (formValue.issueType.value == "ORDER_RELATED_ISSUE") {
      setorderIdDisplay(true);
    } else {
      setorderIdDisplay(false);
    }
  }, [formValue.issueType]);
  const validateFields = () => {
    let flag = false;
    const errObj = {
      issueType: "",
      subject: "",
      content: "",
    };
    if (!formValue.issueType?.value?.length) {
      errObj.issueType = validateMessage.field_required;
      flag = true;
    }
    if (!formValue.subject) {
      errObj.subject = validateMessage.field_required;
      flag = true;
    }
    if (formValue.subject.length > 50) {
      errObj.subject = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length === 0) {
      errObj.content = validateMessage.field_required;
      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length > 255) {
      errObj.content = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    setErrorObj({ ...errObj });
    if (!flag) {
      // route.push("/supplier/helpandsupport");
      setShowCreateTicketComponent(false);
    }
    return flag;
  };

  const mediaUrlToBase64 = async (file) => {
    const formData = new FormData();
    // formData.append("ticketCreatedById", userId);
    formData.append("ticketCreatedByType", "ADMIN");
    file.forEach((ele) => {
      formData.append("imageList", ele);
    });

    const { data } = await getMediaUrl(formData);
    if (data) {
      setMediaConverted([...data]);
    }
  };
  // const userId = useSelector((state) => state?.user?.userId);
  const { userId, role } = useSelector((state) => state?.user);

  const createPayload = () => {
    return {
      issueType: formValue.issueType.label,
      orderId: formValue.OrderID,
      issueSubject: formValue.subject,
      userFromType: role,
      userFromId: userId,
      userToType: "CUSTOMER",
      userToId: formValue.userToId.id,
      mediaUrl: mediaConverted.map((ele) => ele),
      helpSupportMessagePojos: [
        {
          messageFromId: userId,
          messageFromType: role,
          message: formValue.content,
        },
      ],
    };
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      const payload = createPayload();
      const { data, err } = await helpandSupportTicket(payload);
      if (data) {
        toastify(data.message, "success");
        setShowCreateTicketComponent(false);
        getTabledata(0);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <>
      <Paper className="w-100 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
        <Typography
          onClick={() => {
            setShowCreateTicketComponent(false);
          }}
          className="mb-2 h-5 ms-3 cursor-pointer color-orange py-1"
        >
          {"<"}Back
        </Typography>
        <p className="fs-16 fw-bold pb-2 border-bottom py-3 px-4">
          Help & support{" "}
          <span className="fs-12 fw-normal text-secondary">
            (Any Issues Please Raise To Us Here)
          </span>
        </p>
        <div className="my-3 px-5">
          <Grid container className="d-flex align-items-center">
            <Grid item xs={2} className="fw-bold">
              Issue type :
            </Grid>
            <Grid item xs={8}>
              <SimpleDropdownComponent
                size="small"
                value={formValue.issueType}
                helperText={errorObj.issueType}
                error={errorObj.issueType.length}
                list={[...issueTypes]}
                onDropdownSelect={(value) => {
                  // setSelectedIssue({ ...value });
                  setFormValue((pre) => ({
                    ...pre,
                    issueType: { ...value },
                  }));
                }}
              />
            </Grid>
          </Grid>
          {orderIdDisplay ? (
            <>
              <Grid container className="d-flex align-items-center my-3">
                <Grid item xs={2} className="fw-bold">
                  Order Id :
                </Grid>
                <Grid item xs={8}>
                  <InputBox
                    className="w-100"
                    size="small"
                    value={formValue.OrderID}
                    onInputChange={(e) => {
                      setFormValue((pre) => ({
                        ...pre,
                        OrderID: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <div className="my-3" />
          )}
          <Grid container className="d-flex align-items-center">
            <Grid item xs={2} className="fw-bold">
              Subject :
            </Grid>
            <Grid item xs={8}>
              <InputBox
                helperText={errorObj.subject}
                error={errorObj.subject.length}
                className="w-100"
                size="small"
                value={formValue.subject}
                onInputChange={(e) => {
                  setFormValue((pre) => ({
                    ...pre,
                    subject: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="d-flex align-items-center my-3">
            <Grid item xs={2} className="fw-bold">
              To :
            </Grid>
            <Grid item xs={8}>
              <SimpleDropdownComponent
                size="small"
                value={formValue.userToId}
                list={customerList}
                onDropdownSelect={(value) => {
                  setFormValue((pre) => ({
                    ...pre,
                    userToId: value,
                  }));
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="my-2 ps-5">
          <div className="">
            <TextEditor
              getContent={(text) => {
                setFormValue((pre) => ({
                  ...pre,
                  content: text,
                }));
              }}
            />
            {errorObj.content && (
              <p className="error" id="textbox-helper-text">
                {errorObj.content}
              </p>
            )}
          </div>
          <Grid container className="my-3">
            <Grid item xs={6}>
              <span className="me-2 fw-bold">Attach File :</span>
              <ButtonComponent
                label="Choose File"
                color="#e8e8e8"
                onBtnClick={() => {
                  // inputField.current.click();
                  setShowUploadModal(true);
                }}
              />
            </Grid>
            {/* <input
            type="file"
            className=""
            hidden
            ref={inputField}
            onChange={(e) => // console.log(e.target.files[0])}
          /> */}
            <Grid item xs={6} className="d-flex flex-row-reverse pe-5">
              <ButtonComponent
                label="Create Ticket"
                onBtnClick={handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
        <FileUploadModal
          getUploadedFiles={(value) => {
            setFormValue({
              ...formValue,
              imageUrl: value.multiPart,
            });
            mediaUrlToBase64(value.multiPart);
          }}
          type="file"
          showModal={showUploadModal}
          setShowModal={setShowUploadModal}
          acceptedTypes={["png", "jpg", "pdf", "jpeg"]}
        />
      </Paper>
    </>
  );
};
export default CreateTicket;
