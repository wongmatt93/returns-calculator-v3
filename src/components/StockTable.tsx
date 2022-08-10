import Stock from "../models/Stock";
import StockRow from "./StockRow";
import "./StockTable.css";

interface Props {
  stocks: Stock[];
}

const StockTable = ({ stocks }: Props) => {
  return (
    <table className="StockTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Cost Basis</th>
          <th>Cash Returns</th>
          <th>Percent Returns</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length ? (
          stocks.map((stock) => <StockRow stock={stock} key={stock.ticker} />)
        ) : (
          <tr>
            <td colSpan={4}>No Stocks Added</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StockTable;
