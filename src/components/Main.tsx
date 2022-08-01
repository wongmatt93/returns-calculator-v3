import { useEffect, useState } from "react";
import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";
import { totalStockReturn } from "../services/calculateFunctions";
import {
  filterStockDividends,
  filterStockOptions,
  filterStockSales,
} from "../services/filterFunctions";
import AddStockForm from "./AddStockForm";
import IndividualStock from "./IndividualStock";
import "./Main.css";
import StockTable from "./StockTable";
import Totals from "./Totals";

const Main = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [individualStock, setIndividualStock] = useState<Stock>({
    ticker: "",
    quantity: 0,
    originalCostBasis: 0,
    currentCostBasis: 0,
    cashReturn: 0,
  });
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [stockSales, setStockSales] = useState<StockSale[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const addStock = (newStock: Stock): void => {
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      newList.push(newStock);
      return newList;
    });
  };

  const deleteStock = (stock: Stock): void => {
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index: number = stocks.indexOf(stock);
      newList.splice(index, 1);
      return newList;
    });
  };

  const buyShares = (stock: Stock, quantity: number, cost: number): void => {
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      const index = newList.findIndex((item) => item === stock);
      newList[index].quantity += quantity;
      newList[index].originalCostBasis += cost;
      newList[index].currentCostBasis += cost;
      return newList;
    });
  };

  const addDividend = (dividend: Dividend): void => {
    setDividends((prev) => {
      const newList: Dividend[] = prev.slice(0);
      newList.push(dividend);
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
    setStockSales((prev) => {
      const newList: StockSale[] = prev.slice(0);
      newList.push({
        ticker: stock.ticker,
        date: date,
        soldAmount: amount,
        profit: profit,
        quantity: quantity,
      });
      return newList;
    });
  };

  const addOpenOptions = (option: Option): void => {
    setOptions((prev) => {
      const newList: Option[] = prev.slice(0);
      newList.push(option);
      return newList;
    });
    if (option.type === "sto" && option.callPut === "p") {
      setStocks((prev) => {
        const newList: Stock[] = prev.slice(0);
        const index = newList.findIndex(
          (stock) => stock.ticker === option.ticker
        );
        newList[index].originalCostBasis += option.strike * 100;
        return newList;
      });
    }
  };

  useEffect(() => {
    setStocks((prev) => {
      const newList: Stock[] = prev.slice(0);
      newList.forEach((stock) => {
        stock.cashReturn = totalStockReturn(
          stock,
          dividends,
          options,
          stockSales
        );
      });
      return newList;
    });
  }, [dividends, stockSales, options]);

  return (
    <main className="Main">
      <Totals stocks={stocks} />
      <AddStockForm stocks={stocks} onAddStock={addStock} />
      <StockTable stocks={stocks} onSetIndStock={setIndividualStock} />
      <IndividualStock
        indStock={individualStock}
        dividends={filterStockDividends(individualStock, dividends)}
        stockSales={filterStockSales(individualStock, stockSales)}
        options={filterStockOptions(individualStock, options)}
        onDeleteStock={deleteStock}
        onSetIndStock={setIndividualStock}
        onAddDividend={addDividend}
        onBuyShares={buyShares}
        onSellShares={sellShares}
        onAddOpenOptions={addOpenOptions}
      />
    </main>
  );
};

export default Main;
