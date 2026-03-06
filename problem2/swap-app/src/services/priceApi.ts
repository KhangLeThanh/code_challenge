import axios from "axios";
import type { TokenPrice } from "../utils/type";
import { PRICES_URL } from "../utils/baseUrl";

export const fetchTokenPrices = async () => {
  const response = await axios.get<TokenPrice[]>(PRICES_URL);
  const data = response.data;

  // Keep latest price per currency
  const latestPrices: Record<string, TokenPrice> = {};

  data.forEach((token) => {
    const existing = latestPrices[token.currency];

    if (!existing || new Date(token.date) > new Date(existing.date)) {
      latestPrices[token.currency] = token;
    }
  });

  const prices: Record<string, number> = Object.fromEntries(
    Object.entries(latestPrices).map(([k, v]) => [k, v.price])
  );

  const tokens = Object.values(latestPrices);

  return { prices, tokens };
};
