import { InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const TextInput = ({
  label,
  type = 'text',
  name,
  placeholder,
  onChange,
  isError,
  value,
  inputRef,
  shrink,
  classes,
  disabled = false,
  inputStyle = '16px',
  showAdornment,
  adornmentClassName = '',
  adornment,
  adornmentOnClick,
}: {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  value?: string;
  inputRef?: any;
  shrink?: boolean;
  classes?: string;
  disabled?: boolean;
  inputStyle?: any;
  showAdornment?: boolean;
  adornmentClassName?: string;
  adornment?: any;
  adornmentOnClick?: any;
}) => {
  return (
    <div className={`w-full ${classes}`}>
      <TextField
        error={isError && !value ? true : false}
        label={label}
        variant="outlined"
        className="w-full"
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value ? value : null}
        sx={{
          '& .css-10m55e3-MuiFormLabel-root-MuiInputLabel-root': {
            fontSize: '0.8rem',
          },
          '& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input': {
            fontSize: '0.8rem',
            ...inputStyle,
          },
        }}
        inputRef={inputRef}
        InputLabelProps={{
          shrink: shrink,
        }}
        InputProps={{
          endAdornment: showAdornment ? (
            <div onClick={adornmentOnClick}>
              <InputAdornment className={adornmentClassName} position="end">
                {adornment}
              </InputAdornment>
            </div>
          ) : (
            <></>
          ),
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
