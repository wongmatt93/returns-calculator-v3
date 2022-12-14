import { Navigate, useNavigate } from "react-router-dom";
import Stock from "../models/Stock";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import "./StockRow.css";

interface Props {
  stock: Stock;
  // onSetIndStock: () => void;
}

const StockRow = ({ stock }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/stocks/${encodeURIComponent(stock.ticker)}/details`);
  };

  return (
    <tr className="StockRow">
      <td onClick={() => handleClick()}>{stock.ticker}</td>
      <td>{formatMoney(stock.costBasis)}</td>
      <td>{formatMoney(stock.cashReturn)}</td>
      <td>
        {stock.costBasis
          ? formatPercent(stock.cashReturn, stock.costBasis)
          : "N/A"}
      </td>
    </tr>
  );
};

export default StockRow;
