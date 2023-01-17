import { Delete, Edit } from "@mui/icons-material";
import { Paper, Tooltip, Box, Typography, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  addProfile,
  deleteProfile,
  getCustomerProfile,
  switchProfile,
  updateProfile,
  uploadProfile,
} from "services/customer/customerProfile";
import toastify from "services/utils/toastUtils";
// import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiSwitchHorizontal } from "react-icons/hi";
import { storeUserInfo } from "features/customerSlice";
import { useRouter } from "next/router";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import { getBase64 } from "services/utils/functionUtils";
import InputBox from "@/atoms/InputBoxComponent";

const Profile = () => {
  const { userId } = useSelector((state) => state.customer);
  const [profileList, setProfileList] = useState([]);
  const bg_color = ["#fe4a49", "#966b9d", "#1A936F", "#907AD6", "#114B5F"];
  const dispatch = useDispatch();
  const router = useRouter();
  const [editModal, seteditModal] = useState(null);
  const [addImage, setAddImage] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const imgRef = useRef(null);

  const getProfiles = async () => {
    const { data, err } = await getCustomerProfile(userId);
    if (data) {
      setProfileList(data);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (userId !== "") {
      getProfiles();
    }
  }, [userId]);

  const getName = (str) => {
    let letters = "";
    if (str === null) return "";
    str.split(" ").forEach((i) => {
      letters += i.toUpperCase()[0];
    });
    return letters;
  };

  const handleProfileSwitch = async (profile) => {
    const { data, err } = await switchProfile(
      profile.profileId,
      profile.customerId
    );
    if (data) {
      toastify(data.message, "success");
      dispatch(
        storeUserInfo({
          profileImg: data.data.profileImageUrl,
          profileId: data.data.profileId,
          profileName: data.data.profileName,
        })
      );
      router.push("/customer/home");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
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
        getProfiles();
        setShowModal(false);
        setError("");
        setProfileName("");
        setAddImage(false);
        setImg("");
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

  const deleteprofile = async (item) => {
    const { data, err } = await deleteProfile(item.profileId, item.customerId);
    if (data) {
      toastify(data.message, "success");
      getProfiles();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <>
      {profileList.length <= 4 && (
        <div className="d-flex justify-content-end">
          <Typography
            className="fs-16 color-orange cursor-pointer"
            onClick={() => {
              setShowModal(true);
            }}
          >
            + New Profile
          </Typography>
        </div>
      )}
      <Box className="w-100 d-flex justify-content-center my-3 flex-wrap">
        {profileList.map((item, index) => {
          return (
            <Paper
              style={{
                width: "250px",
                overflow: "hidden",
                height: "250px",
              }}
              className="m-2 rounded d-flex flex-column align-items-center"
            >
              <Box className="w-100 d-flex justify-content-center bg-info p-3">
                {item.profileImageUrl ? (
                  <Image
                    src={item.profileImageUrl}
                    width={90}
                    height={90}
                    className="rounded-circle shadow "
                    style={{
                      width: "90px",
                      height: "90px",
                      background: bg_color[index],
                    }}
                    onError={() => {
                      // const ele = document.getElementById(
                      //   `${item.profileName}-${index}`
                      // );
                      // ele.classList.add("d-none");
                      // const ele1 = document.getElementById(
                      //   `${item.profileName}-${index}-text`
                      // );
                      // ele1.classList.remove("d-none");
                    }}
                  />
                ) : (
                  <Paper
                    id={`${item.profileName}-${index}-text`}
                    elevation={3}
                    className="rounded-circle d-flex justify-content-center align-items-center cursor-pointer profile_container"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: bg_color[index],
                    }}
                  >
                    <Typography className="fw-bold color-white h-2">
                      {getName(item.profileName)}
                    </Typography>
                  </Paper>
                )}
              </Box>
              <Typography className="mt-3 fw-500 fs-20">
                {item.profileName}
              </Typography>
              <div className="d-flex align-items-center w-75 justify-content-evenly mt-4">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Tooltip title="Switch">
                    <HiSwitchHorizontal
                      className="m-1 shadow cursor-pointer rounded-circle"
                      size={40}
                      style={{
                        background: "#e56700",
                        color: "#fff ",
                        padding: "5px",
                      }}
                      onClick={() => {
                        handleProfileSwitch(item);
                      }}
                    />
                  </Tooltip>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Tooltip title="Update">
                    <Edit
                      className=" m-1 shadow cursor-pointer rounded-circle"
                      size={40}
                      style={{
                        background: "#e56700",
                        color: "#fff ",
                        padding: "5px",
                      }}
                      onClick={() => {
                        seteditModal(item);
                        setAddImage(true);
                        setProfileName(item.profileName);
                        setShowModal(true);
                      }}
                    />
                  </Tooltip>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Tooltip title="Delete">
                    <Delete
                      size={40}
                      className=" m-1  cursor-pointer rounded-circle shadow"
                      style={{
                        background: "#e56700",
                        color: "#fff",
                        padding: "5px",
                      }}
                      onClick={() => {
                        deleteprofile(item);
                      }}
                    />
                  </Tooltip>
                </motion.div>
              </div>
            </Paper>
          );
        })}
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
      </Box>
    </>
  );
};
export default Profile;
