import { InputAdornment, TextField } from '@mui/material';

export default function FormikInput({
  label,
  type = 'text',
  name,
  onChange = () => {},
  disabled = false,
  value = '',
  error,
  placeholder,
  shrink = undefined,
  inputStyle,
  touched,
  inputRef,
  className,
  showAdornment,
  adornment,
  multiline = false,
  rows = 0,
}: {
  label: string;
  type: string;
  name: string;
  onChange?: any;
  value?: any;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  shrink?: boolean;
  inputStyle?: any;
  touched?: any;
  inputRef?: any;
  className?: string;
  showAdornment?: boolean;
  adornment?: any;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="w-full">
      <div className={`flex flex-col gap-1 relative ${className}`}>
        <>
          <TextField
            multiline={multiline}
            rows={rows}
            error={error && touched ? true : false}
            label={label}
            variant="outlined"
            className={`w-full`}
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
              startAdornment: showAdornment ? <InputAdornment position="start">{adornment}</InputAdornment> : <></>,
            }}
            disabled={disabled}
          />
          {/* {isRuntimeCheck && (
                <RuntimeCheck
                    isTyping={isTyping}
                    availablity={availablity}
                    onClick={() => {
                        setFieldValue(name, "")
                    }}
                    value={value}
                    error={error}
                    message={messageRuntimeCheck}
                    className={`top-3 right-0 ${className}`}
                />
            )} */}
          {error && touched && <span className="text-xs text-errorColor">{error}</span>}
        </>
      </div>
    </div>
  );
}
