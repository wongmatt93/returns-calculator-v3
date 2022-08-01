import Dividend from "../models/Dividend";
import Option from "../models/Option";
import Stock from "../models/Stock";
import StockSale from "../models/StockSale";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import AddDividendForm from "./AddDividendForm";
import AddOptionsForm from "./AddOptionsForm";
import BuySharesForm from "./BuySharesForm";
import DividendTable from "./DividendTable";
import "./IndividualStock.css";
import SellSharesForm from "./SellSharesForm";
import StockCloseOptionsTable from "./StockCloseOptionsTable";
import StockOpenOptionsTable from "./StockOpenOptionsTable";
import StockSalesTable from "./StockSalesTable";

interface Props {
  indStock: Stock;
  dividends: Dividend[];
  stockSales: StockSale[];
  options: Option[];
  onDeleteStock: (stock: Stock) => void;
  onSetIndStock: (stock: Stock) => void;
  onAddDividend: (dividend: Dividend) => void;
  onBuyShares: (stock: Stock, quantity: number, cost: number) => void;
  onSellShares: (
    stock: Stock,
    amount: number,
    quantity: number,
    date: string
  ) => void;
  onAddOpenOptions: (option: Option) => void;
}

const IndividualStock = ({
  indStock,
  dividends,
  stockSales,
  options,
  onDeleteStock,
  onSetIndStock,
  onAddDividend,
  onBuyShares,
  onSellShares,
  onAddOpenOptions,
}: Props) => {
  const handleDeleteClick = (): void => {
    if (indStock) {
      onDeleteStock(indStock);
      onSetIndStock({
        ticker: "",
        quantity: 0,
        originalCostBasis: 0,
        currentCostBasis: 0,
        cashReturn: 0,
      });
    }
  };

  return (
    <div
      className="IndividualStock"
      style={{ display: indStock.ticker ? "block" : "none" }}
    >
      <h2>{indStock?.ticker}</h2>
      <button onClick={() => handleDeleteClick()}>Delete Stock</button>
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
            <td>{indStock.quantity}</td>
            <td>{formatMoney(indStock?.originalCostBasis)}</td>
            <td>{formatMoney(indStock?.currentCostBasis)}</td>
            <td>{formatMoney(indStock?.cashReturn)}</td>
            <td>
              {indStock?.originalCostBasis
                ? formatPercent(indStock.cashReturn, indStock.originalCostBasis)
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
      <BuySharesForm indStock={indStock} onBuyShares={onBuyShares} />
      <SellSharesForm indStock={indStock} onSellShares={onSellShares} />
      <StockSalesTable stockSales={stockSales} />
      <AddOptionsForm indStock={indStock} onAddOpenOptions={onAddOpenOptions} />
      <StockOpenOptionsTable options={options} />
      <StockCloseOptionsTable />
      <AddDividendForm ticker={indStock.ticker} onAddDividend={onAddDividend} />
      <DividendTable dividends={dividends} />
    </div>
  );
};

export default IndividualStock;
