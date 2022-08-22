// This will be improved

interface ICurrencyConfig {
  locale?: string;
  currencyCode?: string;
  currencyDisplay?: string;
  useGrouping?: boolean;
  minimumFractionDigits?: boolean;
}

interface FakeSyntheticEvent {
  target: {
    name: string;
    value: string;
    id: string;
  };
}
interface MoneyInputProps {
  className?: string;
  style?: React.CSSProperties;
  currencyConfig?: ICurrencyConfig;
  customInput?: React.ComponentType;
  name?: string;
  id?: string;
  max?: number;
  onChange?: (event: FakeSyntheticEvent) => any;
  value?: number;
}

declare const MoneyInput: MoneyInputProps;
declare module "@rschpdr/react-money-input";
