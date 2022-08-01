import Dividend from "../models/Dividend";
import { formatMoney } from "../services/formatFunctions";
import "./DividendRow.css";

interface Props {
  dividend: Dividend;
}

const DividendRow = ({ dividend }: Props) => {
  return (
    <tr className="DividendRow">
      <td>{formatMoney(dividend.amount)}</td>
      <td>{dividend.date}</td>
    </tr>
  );
};

export default DividendRow;
