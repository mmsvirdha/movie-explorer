import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";

export default function SearchBar({ initial, onSearch }) {
  const [v, setV] = useState(initial || "");
  const [focus, setFocus] = useState(false);

  return (
    <TextField
      fullWidth
      placeholder="Search for a movie..."
      value={v}
      onChange={(e) => setV(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSearch(v)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search
              sx={{
                color: focus ? "primary.main" : "text.secondary",
                transition: "color 0.2s",
              }}
            />
          </InputAdornment>
        ),
        endAdornment: v && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setV("");
                onSearch("");
              }}
              edge="end"
              size="small"
            >
              <Clear fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 999,
          py: 0.5,
          pl: 1,
          transition: "box-shadow 0.25s, border-color 0.25s",
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(167,139,250,0.15)",
          },
        },
      }}
    />
  );
}