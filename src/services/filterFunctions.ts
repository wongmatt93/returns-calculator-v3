import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";

const filterStockDividends = (
  stock: Stock,
  dividends: Dividend[]
): Dividend[] =>
  dividends.filter((dividend) => dividend.ticker === stock.ticker);

const filterStockSales = (stock: Stock, stockSales: StockSale[]): StockSale[] =>
  stockSales.filter((stockSale) => stockSale.ticker === stock.ticker);

const filterBTO = (options: Option[]): Option[] =>
  options.filter((option) => option.type === "bto");

const filterBTC = (options: Option[]): Option[] =>
  options.filter((option) => option.type === "btc");

const filterSTO = (options: Option[]): Option[] =>
  options.filter((option) => option.type === "sto");

const filterSTC = (options: Option[]): Option[] =>
  options.filter((option) => option.type === "stc");

const filterOpenOptions = (options: Option[]): Option[] =>
  options.filter((option) => option.type.includes("o"));

const removeClosedPositions = (options: Option[]): Option[] =>
  options.filter((option) => option.open);

const filterCloseOptions = (options: Option[]): Option[] =>
  options.filter((option) => option.type.includes("c"));

const filterStockOptions = (stock: Stock, options: Option[]): Option[] =>
  options.filter((option) => option.ticker === stock.ticker);

const filterOptionsThatRequireStocks = (options: Option[]): Option[] =>
  options.filter(
    (option) =>
      (option.type === "sto" && option.callPut === "c") ||
      (option.type === "bto" && option.callPut === "p")
  );

export {
  filterStockDividends,
  filterStockSales,
  filterBTO,
  filterBTC,
  filterSTO,
  filterSTC,
  filterOpenOptions,
  removeClosedPositions,
  filterCloseOptions,
  filterStockOptions,
  filterOptionsThatRequireStocks,
};
