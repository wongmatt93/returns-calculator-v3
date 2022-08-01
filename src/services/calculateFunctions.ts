import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";
import {
  filterStockDividends,
  filterStockOptions,
  filterStockSales,
} from "./filterFunctions";

const totalStockReturn = (
  stock: Stock,
  dividends: Dividend[],
  options: Option[],
  stockSales: StockSale[]
) => {
  const totalDividends: number = filterStockDividends(stock, dividends).reduce(
    (pv, cv) => pv + cv.amount,
    0
  );
  const totalOptions: number = filterStockOptions(stock, options).reduce(
    (pv, cv) => (cv.type.includes("s") ? pv + cv.premium : pv - cv.premium),
    0
  );
  const totalStockSales: number = filterStockSales(stock, stockSales).reduce(
    (pv, cv) => pv + cv.profit,
    0
  );

  return totalDividends + totalOptions + totalStockSales;
};

export { totalStockReturn };
