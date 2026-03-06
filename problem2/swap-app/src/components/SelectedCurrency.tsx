import React from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import type { TokenPrice } from "../utils/type";
import { TOKEN_URL } from "../utils/baseUrl";
import { getTokenImageName } from "../utils/tokenUtils";

interface SelectedCurrencyProps {
  label: string;
  value: string;
  options: TokenPrice[];
  onChange: (value: string) => void;
  error?: string;
}

const SelectedCurrency: React.FC<SelectedCurrencyProps> = ({
  label,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        name={label.toLowerCase()}
      >
        {options.map((token) => (
          <MenuItem key={token.currency} value={token.currency}>
            <img
              src={`${TOKEN_URL}${getTokenImageName(token.currency)}.svg`}
              alt={token.currency}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            {token.currency}
          </MenuItem>
        ))}
      </Select>
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
};

export default SelectedCurrency;
