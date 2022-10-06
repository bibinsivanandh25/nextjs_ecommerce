import styled from "@emotion/styled";
import { FormGroup, FormControlLabel, Switch, Stack } from "@mui/material";

// eslint-disable-next-line no-unused-vars
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#e56700",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    background: "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    // backgroundColor:
    boxSizing: "border-box",
    background: "#DCDCDC",
  },
}));

const SwitchComponent = ({
  label = "label",
  defaultChecked = false,
  ontoggle = () => {},
  size = "small",
  styledSwitch = true,
}) => {
  // const [checked, setChecked] = useState(false);
  // useEffect(() => {
  //   console.log(defaultChecked, checked, "reached");
  //   setChecked(defaultChecked);
  // }, [defaultChecked]);

  return !styledSwitch ? (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={defaultChecked}
            onChange={() => {
              // setChecked(!checked);
              ontoggle(!defaultChecked);
            }}
            size={size}
          />
        }
        label={label}
      />
    </FormGroup>
  ) : (
    <FormGroup>
      <FormControlLabel
        control={
          <Stack direction="row" spacing={1} alignItems="center">
            <AntSwitch
              inputProps={{ "aria-label": "ant design" }}
              checked={defaultChecked}
              onChange={() => {
                ontoggle(!defaultChecked);
              }}
            />
          </Stack>
        }
        label={label}
      />
    </FormGroup>
  );
};

export default SwitchComponent;
