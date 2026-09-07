import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export default function DataPicker({
  width = "400px",
  height = "50px",
  label,
  value = "",
  onChange,
}) {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (!cleared) return;

    const timeout = setTimeout(() => {
      setCleared(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [cleared]);

  const pickerValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        sx={{
          width,
          height,
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <DatePicker
          label={label}
          value={pickerValue}
          onChange={(newValue) => {
            if (!newValue || !newValue.isValid()) {
              onChange?.("");
              return;
            }

            const formattedDate = newValue.format("YYYY-MM-DD");

            onChange?.(formattedDate);
          }}
          format="DD/MM/YYYY"
          slotProps={{
            field: {
              clearable: true,

              onClear: () => {
                onChange?.("");
                setCleared(true);
              },
            },
          }}
          sx={{
            width,
            "& .MuiPickersOutlinedInput-root": {
              height: "50px",
            },
          }}
        />

        {cleared && (
          <Alert
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            severity="success"
          >
            Campo limpo!
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
}
