const TOKEN_NAME_MAP: Record<string, string> = {
  RATOM: "rATOM",
  STEVMOS: "stEVMOS",
  STOSMO: "stOSMO",
  STATOM: "stATOM",
  STLUNA: "stLUNA",
};

export const getTokenImageName = (token: string): string => {
  return TOKEN_NAME_MAP[token] ?? token;
};
