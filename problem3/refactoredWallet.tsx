import React, { useMemo } from "react";

enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}

type WalletBalance = {
  currency: string;
  amount: number;
  blockchain: string;
};

type FormattedWalletBalance = WalletBalance & {
  formatted: string;
};

type Props = BoxProps;

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Simplified getPriority using the enum directly
  const getPriority = (blockchain: string): number => {
    return (
      BlockchainPriority[blockchain as keyof typeof BlockchainPriority] ??
      BlockchainPriority.Default
    );
  };

  // Refactored sortedBalances logic
  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return (
          balancePriority > BlockchainPriority.Default && balance.amount > 0
        );
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain); // Simplified sorting
      })
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // Format to 2 decimal places
      }));
  }, [balances]); // Removed prices from dependencies

  // Using a unique key, assuming currency is unique
  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Use currency as a unique key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
