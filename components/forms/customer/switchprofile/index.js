/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import {
  getCustomerProfile,
  addProfile,
  uploadProfile,
  deleteProfile,
  updateProfile,
  switchProfile,
} from "services/customer/customerProfile";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
// import AddIcon from "@mui/icons-material/Add";
// import CheckIcon from "@mui/icons-material/Check";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import validateMessage from "constants/validateMessages";
import { getBase64 } from "services/utils/functionUtils";
import CloseIcon from "@mui/icons-material/Close";
import { storeUserInfo } from "features/customerSlice";
import { useRouter } from "next/router";
import { HiSwitchHorizontal } from "react-icons/hi";

const SwitchProfile = ({
  showSwitchProfile = false,
  setShowSwitchProfile = () => {},
}) => {
  const bg_color = ["#fe4a49", "#966b9d", "#1A936F", "#907AD6", "#114B5F"];
  const [profileList, setProfileList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [error, setError] = useState("");
  const { userId, profileId } = useSelector((state) => state.customer);
  const [addImage, setAddImage] = useState(false);
  const [img, setImg] = useState("");
  const imgRef = useRef(null);
  const [editModal, seteditModal] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const getProfiles = async () => {
    const { data, err } = await getCustomerProfile(userId);
    if (data) {
      setProfileList(data);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const TruncateName = ({ name }) => {
    const truncatedName =
      // eslint-disable-next-line prefer-template
      name.length > 20 ? name.substring(0, 20) + "..." : name;

    return <div>{truncatedName}</div>;
  };
  const handleProfileSwitch = async (profile, showMessage = true) => {
    const { data, err } = await switchProfile(
      profile.profileId,
      profile.customerId
    );
    if (data) {
      if (showMessage) toastify(data.message, "success");
      dispatch(
        storeUserInfo({
          profileImg: data.data.profileImageUrl,
          profileId: data.data.profileId,
          profileName: data.data.profileName,
        })
      );
      getProfiles();
      router.push("/customer/home");
    } else if (err) {
      if (showMessage) toastify(err?.response?.data?.message, "error");
    }
  };

  const handleSubmit = async () => {
    if (profileName === "") {
      setError(validateMessage.field_required);
    } else {
      setError("");
      let payload = {};
      if (img !== "") {
        const imgRes = await uploadProfile(userId, img);
        if (imgRes.data) {
          payload = {
            customerId: userId,
            profileName,
            profileImageUrl: imgRes.data,
          };
        } else {
          toastify(imgRes.err?.response?.data?.message, "error");
          return;
        }
      } else {
        payload = {
          customerId: userId,
          profileName,
          profileImageUrl: "",
        };
      }
      const { data, err } = await addProfile(payload);
      if (data) {
        toastify(data.message, "success");
        getProfiles();
        setShowModal(false);
        setError("");
        setProfileName("");
        setAddImage(false);
        setImg("");
        dispatch(
          storeUserInfo({
            profileImg: data.data.profileImageUrl,
            profileId: data.data.profileId,
            profileName: data.data.profileName,
          })
        );
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const handleProfileUpdate = async () => {
    let payload = {};
    if (img !== "") {
      const imgRes = await uploadProfile(userId, img);
      if (imgRes.data) {
        payload = {
          customerId: userId,
          profileName,
          profileImageUrl: imgRes.data,
          profileId: editModal.profileId,
        };
      } else {
        toastify(imgRes.err?.response?.data?.message, "error");
        return;
      }
    } else {
      payload = {
        customerId: userId,
        profileName,
        profileImageUrl: editModal.profileImageUrl,
        profileId: editModal.profileId,
      };
    }
    const { data, err } = await updateProfile(payload);
    if (data === null) {
      getProfiles();
      setShowModal(false);
      setError("");
      setProfileName("");
      setAddImage(false);
      setImg("");
      seteditModal(null);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getName = (str) => {
    let letters = "";
    if (str === null) return "";
    str.split(" ").forEach((i) => {
      letters += i.toUpperCase()[0];
    });
    return letters;
  };

  useEffect(() => {
    if (userId !== "") getProfiles();
    return () => {
      setProfileList([]);
    };
  }, []);

  const deleteprofile = async (item) => {
    const { data, err } = await deleteProfile(item.profileId, item.customerId);
    if (data) {
      toastify(data.message, "success");
      if (profileId === item.profileId) {
        const temp = profileList.filter((ele) => ele.profileId !== profileId);
        handleProfileSwitch(temp[0], false);
      }
      getProfiles();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getOverLay = (item) => {
    return (
      <div className="profile_overLay">
        <div className="d-flex h-100 align-items-center justify-content-center shadow rounded-circle">
          {!item.profilePrimary && (
            <Tooltip title="Switch">
              <HiSwitchHorizontal
                className="fs-20 m-1  cursor-pointer rounded-circle  theme_bg_color text-white"
                style={{
                  // fontSize: "19px !important",
                  padding: "2px",
                }}
                onClick={() => {
                  handleProfileSwitch(item);
                }}
              />
            </Tooltip>
          )}
          <Tooltip title="Update">
            <Edit
              className="fs-20 m-1  cursor-pointer rounded-circle text-white theme_bg_color"
              style={{
                background: "#e56700",
                // fontSize: "19px !important",
                padding: "2px",
              }}
              onClick={() => {
                seteditModal(item);
                setAddImage(true);
                setProfileName(item.profileName);
                setShowModal(true);
              }}
            />
          </Tooltip>
          {!item.profilePrimary && (
            <Tooltip title="Delete">
              <Delete
                className="fs-20 m-1  cursor-pointer rounded-circle text-white theme_bg_color"
                style={{
                  background: "#e56700",
                  // fontSize: "20px !important",
                  // color: "rgb(44 1 1 / 60%) ",
                  padding: "2px",
                }}
                onClick={() => {
                  deleteprofile(item);
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  return (
    <ModalComponent
      // showHeader={false}
      ModalTitle="Switch Profile"
      showFooter={false}
      open={showSwitchProfile}
      modalClose={() => {
        setShowSwitchProfile(false);
      }}
      ModalWidth={500}
      onCloseIconClick={() => {
        setShowSwitchProfile(false);
      }}
    >
      <Box className="pt-3 pb-3">
        {/* <Box className="d-flex justify-content-between align-items-center border-bottom">
          <Typography className="fs-20 fw-bold">Switch Profile</Typography>
        </Box> */}
        <Box className="p-2">
          <Grid container spacing={2}>
            {profileList.map((item, index) => {
              return (
                <Grid
                  item
                  md={6}
                  key={item.profileName}
                  className="d-flex position-relative flex-column align-items-center justify-content-center"
                >
                  {item.profileImageUrl ? (
                    <>
                      <Paper
                        className="rounded-circle cursor-pointer profile_container"
                        elevation={8}
                        sx={{
                          height: "90px",
                        }}
                        id={`${item.profileName}-${index}`}
                      >
                        {getOverLay(item)}
                        <Image
                          src={item.profileImageUrl}
                          width={90}
                          height={90}
                          className="rounded-circle"
                          style={{
                            width: "90px",
                            height: "90px",
                            background: bg_color[index],
                          }}
                          onError={() => {
                            const ele = document.getElementById(
                              `${item.profileName}-${index}`
                            );
                            ele.classList.add("d-none");
                            const ele1 = document.getElementById(
                              `${item.profileName}-${index}-text`
                            );
                            ele1.classList.remove("d-none");
                          }}
                        />
                      </Paper>
                      <Paper
                        id={`${item.profileName}-${index}-text`}
                        elevation={3}
                        className="rounded-circle d-flex justify-content-center align-items-center d-none cursor-pointer profile_container"
                        style={{
                          width: "90px",
                          height: "90px",
                          background: bg_color[index],
                        }}
                      >
                        {getOverLay(item)}
                        <Typography className="fw-bold color-white h-2">
                          {getName(item.profileName)}
                        </Typography>
                      </Paper>
                    </>
                  ) : (
                    <Paper
                      elevation={3}
                      className="rounded-circle d-flex justify-content-center align-items-center cursor-pointer profile_container"
                      style={{
                        width: "90px",
                        height: "90px",
                        background: bg_color[index],
                      }}
                    >
                      {getOverLay(item)}

                      <Typography className="h-2 fw-bold color-white">
                        {getName(item.profileName)}
                      </Typography>
                    </Paper>
                  )}
                  <Typography
                    className=" fw-500 "
                    onClick={() => {
                      handleProfileSwitch(item);
                    }}
                  >
                    {/* {item.profileName} */}
                    <TruncateName
                      name={JSON.parse(JSON.stringify(item.profileName))}
                    />
                  </Typography>
                </Grid>
              );
            })}
            {profileList.length < 5 && (
              <Grid
                item
                md={6}
                className="d-flex position-relative flex-column align-items-center justify-content-center"
              >
                <Box
                  className="d-flex flex-column align-items-center justify-content-center my-2 ms-3"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Box
                    className="bg-light-gray rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <Typography
                      className="color-gray"
                      style={{
                        fontSize: "35px",
                      }}
                    >
                      +
                    </Typography>
                  </Box>
                  <Typography className="ms-3 fw-500 fs-16">
                    Add Account
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <ModalComponent
        ModalTitle={editModal ? "Update Profile" : "Create New Profile"}
        titleClassName="fs-14 bg-light-gray"
        headerClassName="rounded-top bg-light-gray"
        open={showModal}
        onCloseIconClick={() => {
          setError("");
          setProfileName("");
          setImg("");
          setAddImage(false);
          setShowModal(false);
          seteditModal(null);
        }}
        footerClassName=""
        showFooter={false}
      >
        <Box className="m-3">
          <Grid spacing={2} container>
            {addImage && (
              <Grid item md={3}>
                {!editModal?.profileImageUrl && img === "" ? (
                  <Box
                    className="bg-gray rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    onClick={() => {
                      imgRef.current.click();
                    }}
                  >
                    <Typography
                      className="color-white"
                      style={{
                        fontSize: "40px",
                      }}
                    >
                      +
                    </Typography>
                    <input
                      className="d-none"
                      ref={imgRef}
                      accept="image/*"
                      type="file"
                      onChange={async (e) => {
                        const base = await getBase64(e.target.files[0]);
                        setImg(base);
                      }}
                    />
                  </Box>
                ) : (
                  <Box className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                      className="rounded-circle"
                      width={100}
                      height={100}
                      src={
                        editModal && editModal.profileImageUrl !== ""
                          ? editModal.profileImageUrl
                          : img
                      }
                    />
                    <Typography
                      onClick={() => {
                        setImg("");
                        if (editModal) {
                          seteditModal((pre) => ({
                            ...pre,
                            profileImageUrl: "",
                          }));
                        }
                      }}
                      className="mt-3 fs-12 color-light-blue cursor-pointer d-flex justify-content-center align-items-center"
                    >
                      <CloseIcon className="fs-16 me-2" />
                      Remove
                    </Typography>
                  </Box>
                )}
              </Grid>
            )}
            <Grid
              item
              md={addImage ? 9 : 12}
              className="d-flex align-items-center"
            >
              <Box className="w-100 ms-2">
                <InputBox
                  variant="standard"
                  label="Profile Name"
                  value={profileName}
                  onInputChange={(e) => {
                    setProfileName(e.target.value);
                  }}
                  error={error !== ""}
                  helperText={error}
                  inputlabelshrink
                />
                {!addImage && (
                  <Typography
                    onClick={() => {
                      setAddImage(true);
                    }}
                    className="mt-3 fs-12 color-light-blue cursor-pointer"
                  >
                    Add Profile Image
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box className="d-flex justify-content-end mt-2">
            <ButtonComponent
              label="Cancel"
              variant="outlined"
              onBtnClick={() => {
                setError("");
                setProfileName("");
                setImg("");
                setAddImage(false);
                setShowModal(false);
                seteditModal(null);
              }}
            />
            <ButtonComponent
              label={editModal ? "Update" : "Create"}
              muiProps="ms-2"
              onBtnClick={() => {
                // setShowModal(false);
                if (editModal) {
                  handleProfileUpdate();
                } else {
                  handleSubmit();
                }
              }}
            />
          </Box>
        </Box>
      </ModalComponent>
    </ModalComponent>
  );
};

export default SwitchProfile;
