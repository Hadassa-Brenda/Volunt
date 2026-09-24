import TextField from "@mui/material/TextField";

export default function GenericTextField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
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
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      variant={variant}
      disabled={disabled}
      sx={{
        "& .MuiInputLabel-root": {
          fontWeight: 400,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          width: "100%",
          height: height,
        },
        width: "100%",
        maxWidth: width,
      }}
    />
  );
}
