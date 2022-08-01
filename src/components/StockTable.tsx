import Stock from "../models/Stock";
import StockRow from "./StockRow";
import "./StockTable.css";

interface Props {
  stocks: Stock[];
  onSetIndStock: (stock: Stock) => void;
}

const StockTable = ({ stocks, onSetIndStock }: Props) => {
  return (
    <table className="StockTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Original Cost Basis</th>
          <th>Cash Returns</th>
          <th>Percent Returns</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <StockRow stock={stock} onSetIndStock={() => onSetIndStock(stock)} />
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
