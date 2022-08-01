import Stock from "../models/Stock";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import "./StockRow.css";

interface Props {
  stock: Stock;
  onSetIndStock: () => void;
}

const StockRow = ({ stock, onSetIndStock }: Props) => {
  return (
    <tr className="StockRow">
      <td onClick={onSetIndStock}>{stock.ticker}</td>
      <td>{formatMoney(stock.originalCostBasis)}</td>
      <td>{formatMoney(stock.cashReturn)}</td>
      <td>
        {stock.originalCostBasis
          ? formatPercent(stock.cashReturn, stock.originalCostBasis)
          : "N/A"}
      </td>
    </tr>
  );
};

export default StockRow;
