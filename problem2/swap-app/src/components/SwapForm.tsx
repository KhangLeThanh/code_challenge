import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import type { TokenPrice } from "../utils/type";
import { fetchTokenPrices } from "../services/priceApi";
import swapSchema from "../schema/swapSchema";
import SelectedCurrency from "./SelectedCurrency";
import ResultBox from "./ResultBox";

const SwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<TokenPrice[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const { prices, tokens } = await fetchTokenPrices();
        setPrices(prices);
        setTokens(tokens);
      } catch (error) {
        console.error("Failed to fetch prices", error);
      }
    };

    loadPrices();
  }, []);
  const formik = useFormik({
    initialValues: { from: "", to: "", amount: "" },
    validationSchema: swapSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const fromPrice = prices[values.from];
      const toPrice = prices[values.to];
      if (fromPrice && toPrice && parseFloat(values.amount) > 0) {
        const swapped = (parseFloat(values.amount) * fromPrice) / toPrice;
        setResult(swapped);
      } else {
        setResult(null);
      }
    },
  });
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={3}>
        Currency Swap
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* From Currency */}
        <SelectedCurrency
          label="From"
          value={formik.values.from}
          options={tokens}
          onChange={(v) => formik.setFieldValue("from", v)}
          error={formik.errors.from}
        />
        {/* To Currency */}

        <SelectedCurrency
          label="To"
          value={formik.values.to}
          options={tokens}
          onChange={(v) => formik.setFieldValue("to", v)}
          error={formik.errors.to}
        />

        {/* Amount */}
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={!!formik.errors.amount}
          helperText={formik.errors.amount}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Convert
        </Button>
      </form>
      {result !== null && (
        <ResultBox
          from={formik.values.from}
          to={formik.values.to}
          amount={formik.values.amount}
          result={result}
        />
      )}
    </Box>
  );
};

export default SwapForm;
