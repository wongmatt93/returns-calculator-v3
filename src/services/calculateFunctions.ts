import Dividend from "../models/Dividend";
import Option from "../models/Option";
import StockSale from "../models/StockSale";

const totalStockReturn = (
  dividends: Dividend[],
  options: Option[],
  stockSales: StockSale[]
) => {
  const totalDividends: number = dividends.reduce(
    (pv, cv) => pv + cv.amount,
    0
  );
  const totalOptions: number = options.reduce(
    (pv, cv) => (cv.type.includes("s") ? pv + cv.premium : pv - cv.premium),
    0
  );
  const totalStockSales: number = stockSales.reduce(
    (pv, cv) => pv + cv.profit,
    0
  );

  return totalDividends + totalOptions + totalStockSales;
};

export { totalStockReturn };
