import { ReactNode, useState } from "react";
import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import { totalStockReturn } from "../services/calculateFunctions";
import StocksContext from "./StocksContext";

interface Props {
  children: ReactNode;
}

const StocksContextProvider = ({ children }: Props) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockPurchases, setStockPurchases] = useState<StockPurchase[]>([]);
  const [stockSales, setStockSales] = useState<StockSale[]>([]);
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const addStock = (stock: Stock): void =>
    setStocks((prev) => [...prev, stock]);

  const deleteStock = (stock: Stock): void =>
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index: number = stocks.indexOf(stock);
      newList.splice(index, 1);
      return newList;
    });

  const buyShares = (stock: Stock, stockPurchase: StockPurchase): void => {
    setStockPurchases((prev) => [...prev, stockPurchase]);
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index = newList.findIndex((item) => item === stock);
      newList[index].quantity += stockPurchase.quantity;
      newList[index].originalCostBasis += stockPurchase.cost;
      newList[index].currentCostBasis += stockPurchase.cost;
      return newList;
    });
  };

  const sellShares = (
    stock: Stock,
    amount: number,
    quantity: number,
    date: string
  ): void => {
    let profit: number = 0;
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index: number = newList.findIndex((item) => item === stock);
      const remainder: number =
        (quantity / newList[index].quantity) * newList[index].currentCostBasis;
      profit = amount - remainder;
      newList[index].quantity -= quantity;
      newList[index].currentCostBasis -= remainder;
      return newList;
    });
    setStockSales((prev) => [
      ...prev,
      {
        ticker: stock.ticker,
        date: date,
        soldAmount: amount,
        profit: profit,
        quantity: quantity,
      },
    ]);
  };

  const addDividend = (dividend: Dividend): void =>
    setDividends((prev) => [...prev, dividend]);

  const addOpenOptions = (option: Option): void => {
    setOptions((prev) => [...prev, option]);
    if (option.type === "sto" && option.callPut === "p") {
      setStocks((prev) => {
        const newList: Stock[] = prev.slice(0);
        const index = newList.findIndex(
          (stock) => stock.ticker === option.ticker
        );
        newList[index].originalCostBasis += option.strike * 100;
        newList[index].currentCostBasis += option.strike * 100;
        return newList;
      });
    }
  };

  const updateStockTotal = (
    stock: Stock,
    stockSales: StockSale[],
    dividends: Dividend[],
    options: Option[]
  ): void => {
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index: number = newList.findIndex((item) => item === stock);
      newList[index].cashReturn = totalStockReturn(
        dividends,
        options,
        stockSales
      );
      return newList;
    });
  };

  return (
    <StocksContext.Provider
      value={{
        stocks,
        stockPurchases,
        stockSales,
        dividends,
        options,
        updateStockTotal,
        addStock,
        deleteStock,
        buyShares,
        sellShares,
        addDividend,
        addOpenOptions,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

export default StocksContextProvider;
