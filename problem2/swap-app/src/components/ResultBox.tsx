import React from "react";
import { Box, Typography } from "@mui/material";

interface ResultBoxProps {
  from: string;
  to: string;
  amount: string;
  result: number;
}

const ResultBox: React.FC<ResultBoxProps> = ({ from, to, amount, result }) => {
  return (
    <Box mt={3} p={2} bgcolor="#e0f7fa" borderRadius={1}>
      <Typography>
        {amount} {from} = {result.toFixed(6)} {to}
      </Typography>
    </Box>
  );
};
export default ResultBox;
