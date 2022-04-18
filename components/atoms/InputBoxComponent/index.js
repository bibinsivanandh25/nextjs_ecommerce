import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const InputBox= ({
    placeholder='placeholder',
    value='default value',
    label='asdasd',
    className='w-25',
    size='small',
    onInputChange =()=>{}
    })=>{
    return (
        <TextField
        onChange={
        onInputChange
        }
        label={label}
        placeholder={placeholder}
        defaultValue={value}
        size={size}
        className={className}
        endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {<VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
    )

}
export default InputBox;