import { createContext } from "react";
import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";

interface StocksModel {
  stocks: Stock[];
  stockPurchases: StockPurchase[];
  stockSales: StockSale[];
  dividends: Dividend[];
  options: Option[];
  addStock: (stock: Stock) => void;
  deleteStock: (stock: Stock) => void;
  buyShares: (stock: Stock, stockPurchase: StockPurchase) => void;
  sellShares: (
    stock: Stock,
    amount: number,
    quantity: number,
    date: string
  ) => void;
  addDividend: (dividend: Dividend) => void;
  addOpenOptions: (option: Option) => void;
  updateStockTotal: (
    stock: Stock,
    stockSales: StockSale[],
    dividends: Dividend[],
    options: Option[]
  ) => void;
}

const defaultValues: StocksModel = {
  stocks: [],
  stockPurchases: [],
  stockSales: [],
  dividends: [],
  options: [],
  addStock: () => {},
  deleteStock: () => {},
  buyShares: () => {},
  sellShares: () => {},
  addDividend: () => {},
  addOpenOptions: () => {},
  updateStockTotal: () => {},
};

const StocksContext = createContext(defaultValues);

export default StocksContext;
