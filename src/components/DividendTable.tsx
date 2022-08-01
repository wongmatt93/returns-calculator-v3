import Dividend from "../models/Dividend";
import DividendRow from "./DividendRow";
import "./DividendTable.css";

interface Props {
  dividends: Dividend[];
}

const DividendTable = ({ dividends }: Props) => {
  return (
    <table className="DividendTable">
      <caption>Dividends</caption>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {dividends.map((dividend) => (
          <DividendRow dividend={dividend} />
        ))}
      </tbody>
    </table>
  );
};

export default DividendTable;
