export default interface Stock {
  ticker: string;
  quantity: number;
  originalCostBasis: number;
  currentCostBasis: number;
  cashReturn: number;
}
