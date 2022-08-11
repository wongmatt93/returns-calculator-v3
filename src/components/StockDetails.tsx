import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import AddDividendForm from "./AddDividendForm";
import AddOpenOptionsForm from "./AddOpenOptionsForm";
import BuySharesForm from "./BuySharesForm";
import DividendTable from "./DividendTable";
import "./StockDetails.css";
import SellSharesForm from "./SellSharesForm";
import StockOpenOptionsTable from "./StockOpenOptionsTable";
import {
  filterBTO,
  filterSTO,
  filterStockDividends,
  filterStockOptions,
  filterStockSales,
  removeClosedPositions,
} from "../services/filterFunctions";
import Dividend from "../models/Dividend";
import AddCloseOptionsForm from "./AddCloseOptionsForm";
import { getStockInfo } from "../services/AlphaAdvantageService";
import AlphaAdvantageResponse from "../models/AlphaAdvantageResponse";

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
  const [stockInfo, setStockInfo] = useState<
    AlphaAdvantageResponse | undefined
  >();

  const filteredDividends: Dividend[] = filterStockDividends(stock!, dividends);
  const filteredOptions: Option[] = filterStockOptions(stock!, options);
  const filteredStockSales: StockSale[] = filterStockSales(stock!, stockSales);
  let openBTO: Option[] = removeClosedPositions(filterBTO(filteredOptions));
  let openSTO: Option[] = removeClosedPositions(filterSTO(filteredOptions));

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

  useEffect(() => {
    getStockInfo(ticker!).then((response) => {
      setStockInfo(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (): void => {
    if (window.confirm(`Are you sure you want to delete ${stock!.ticker}?`)) {
      deleteStock(stock!);
      navigate("/");
    }
  };

  return (
    <div className="StockDetails">
      {stock && stockInfo ? (
        <>
          <h2>
            {stock.ticker}: {stockInfo.Name}
          </h2>
          <div className="button-container">
            <BuySharesForm stock={stock} />
            <SellSharesForm stock={stock} options={filteredOptions} />
            <AddDividendForm stock={stock} />
            <AddOpenOptionsForm stock={stock} options={filteredOptions} />
            <button onClick={() => handleDeleteClick()}>Delete Stock</button>
          </div>
          <table className="individual-stock-table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Open Options</th>
                <th>Cost Basis</th>
                <th>Cash Return</th>
                <th>Percent Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stock.quantity}</td>
                <td>
                  <div>{`BTO: ${openBTO.length}`}</div>
                  <div>{`STO: ${openSTO.length}`}</div>
                </td>
                <td>{formatMoney(stock.costBasis)}</td>
                <td>{formatMoney(stock.cashReturn)}</td>
                <td>
                  {stock.costBasis
                    ? formatPercent(stock.cashReturn, stock.costBasis)
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          <AddCloseOptionsForm stock={stock} />
          <StockOpenOptionsTable options={filteredOptions} />
          <DividendTable dividends={filteredDividends} />
        </>
      ) : (
        <p>You do not have {ticker} in your portfolio</p>
      )}
    </div>
  );
};

export default StockDetails;
