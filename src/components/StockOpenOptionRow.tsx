import OptionDisplay from "../models/OptionDisplay";
import { formatMoney } from "../services/formatFunctions";
import AddCloseOptionsForm from "./AddCloseOptionsForm";
import "./StockOpenOptionRow.css";

interface Props {
  option: OptionDisplay;
}

const StockOpenOptionRow = ({ option }: Props) => {
  return (
    <tr className="StockOpenOptionRow">
      <td>{option.type.toUpperCase()}</td>
      <td>
        {`${option.expirationDate} ${formatMoney(
          option.strike
        )} ${option.callPut.toUpperCase()}`}
      </td>
      <td>{option.quantity}</td>
      <td>
        <AddCloseOptionsForm optionDisplay={option} />
      </td>
    </tr>
  );
};

export default StockOpenOptionRow;
