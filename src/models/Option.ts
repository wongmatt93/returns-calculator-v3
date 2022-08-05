export default interface Option {
  ticker: string;
  transactionDate: string;
  callPut: string;
  type: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open?: boolean;
  count?: number;
}
