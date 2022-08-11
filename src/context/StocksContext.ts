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
  updateStockTotal: (
    stock: Stock,
    stockSales: StockSale[],
    dividends: Dividend[],
    options: Option[]
  ) => void;
  addStock: (stock: Stock) => void;
  deleteStock: (stock: Stock) => void;
  buyShares: (stock: Stock, stockPurchase: StockPurchase) => void;
  sellShares: (
    stock: Stock,
    amount: number,
    quantity: number,
    date: string,
    options: Option[]
  ) => void;
  addDividend: (dividend: Dividend) => void;
  addOpenOptions: (option: Option) => void;
  addCloseOptions: (
    options: Option[],
    openOptions: Option[],
    option: Option,
    quantity: number
  ) => void;
}

const defaultValues: StocksModel = {
  stocks: [],
  stockPurchases: [],
  stockSales: [],
  dividends: [],
  options: [],
  updateStockTotal: () => {},
  addStock: () => {},
  deleteStock: () => {},
  buyShares: () => {},
  sellShares: () => {},
  addDividend: () => {},
  addOpenOptions: () => {},
  addCloseOptions: () => {},
};

const StocksContext = createContext(defaultValues);

export default StocksContext;
