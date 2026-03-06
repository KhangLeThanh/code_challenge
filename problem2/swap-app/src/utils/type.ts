export type Token = {
  symbol: string;
  name: string;
  iconUrl: string;
  price?: number;
};

export type SwapFormValues = {
  fromToken: string;
  toToken: string;
  fromAmount: number;
};

export type TokenPrice = {
  currency: string;
  date: string;
  price: number;
};
