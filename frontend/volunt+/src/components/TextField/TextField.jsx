import TextField from "@mui/material/TextField";

export default function GenericTextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  variant = "outlined",
  disabled = false,
  helperText,
  width = "400px",
  height = "40px",
}) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      variant={variant}
      disabled={disabled}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          width: width,
          height: height,
        },
      }}
    />
  );
}
