import Option from "../models/Option";
import { formatMoney } from "../services/formatFunctions";
import "./StockOpenOptionRow.css";

interface Props {
  option: Option;
}

const StockOpenOptionRow = ({ option }: Props) => {
  return (
    <tr className="StockOpenOptionRow">
      <td>{option.transactionDate}</td>
      <td>{option.type.toUpperCase()}</td>
      <td>{option.callPut.toUpperCase()}</td>
      <td>{formatMoney(option.strike)}</td>
      <td>{option.expirationDate}</td>
      <td>{formatMoney(option.premium)}</td>
      <td>
        {option.open ? (
          option.type === "bto" ? (
            <button>Sell To Close</button>
          ) : (
            <button>Buy To Close</button>
          )
        ) : (
          "Closed"
        )}
      </td>
    </tr>
  );
};

export default StockOpenOptionRow;
