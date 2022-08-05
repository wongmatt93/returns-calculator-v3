import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import AddDividendForm from "./AddDividendForm";
import AddOptionsForm from "./AddOptionsForm";
import BuySharesForm from "./BuySharesForm";
import DividendTable from "./DividendTable";
import "./StockDetails.css";
import SellSharesForm from "./SellSharesForm";
import StockCloseOptionsTable from "./StockCloseOptionsTable";
import StockOpenOptionsTable from "./StockOpenOptionsTable";
import StockSalesTable from "./StockSalesTable";
import {
  filterStockDividends,
  filterStockOptions,
  filterStockSales,
} from "../services/filterFunctions";
import Dividend from "../models/Dividend";

const StockDetails = () => {
  const {
    stocks,
    dividends,
    options,
    stockSales,
    updateStockTotal,
    deleteStock,
  } = useContext(StocksContext);
  const navigate = useNavigate();
  const ticker: string | undefined = useParams().ticker;
  const stock: Stock | undefined = stocks.find(
    (stock) => stock.ticker === ticker!
  );

  const filteredDividends: Dividend[] = filterStockDividends(stock!, dividends);
  const filteredOptions: Option[] = filterStockOptions(stock!, options);
  const filteredStockSales: StockSale[] = filterStockSales(stock!, stockSales);

  useEffect(() => {
    stock &&
      updateStockTotal(
        stock,
        filteredStockSales,
        filteredDividends,
        filteredOptions
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSales, dividends, options]);

  const handleClick = (): void => {
    if (window.confirm(`Are you sure you want to delete ${stock!.ticker}?`)) {
      deleteStock(stock!);
      navigate("/");
    }
  };

  return (
    <div className="StockDetails">
      {stock ? (
        <>
          <h2>{stock.ticker}</h2>
          <button onClick={() => handleClick()}>Delete Stock</button>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Original Cost Basis</th>
                <th>Current Cost Basis</th>
                <th>Cash Return</th>
                <th>Percent Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stock.quantity}</td>
                <td>{formatMoney(stock.originalCostBasis)}</td>
                <td>{formatMoney(stock.currentCostBasis)}</td>
                <td>{formatMoney(stock.cashReturn)}</td>
                <td>
                  {stock.originalCostBasis
                    ? formatPercent(stock.cashReturn, stock.originalCostBasis)
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          <BuySharesForm stock={stock} />
          <SellSharesForm stock={stock} />
          <StockSalesTable stockSales={filteredStockSales} />
          <AddOptionsForm stock={stock} options={filteredOptions} />
          <StockOpenOptionsTable options={filteredOptions} />
          <StockCloseOptionsTable />
          <AddDividendForm ticker={stock.ticker} />
          <DividendTable dividends={filteredDividends} />
        </>
      ) : (
        <p>You do not have {ticker} in your portfolio</p>
      )}
    </div>
  );
};

export default StockDetails;
