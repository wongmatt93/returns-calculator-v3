import Option from "../models/Option";
import StockOpenOptionRow from "./StockOpenOptionRow";
import "./StockOpenOptionsTable.css";

interface Props {
  options: Option[];
}

const StockOpenOptionsTable = ({ options }: Props) => {
  return (
    <table className="StockOpenOptionsTable">
      <thead>
        <tr>
          <th>Transaction Date</th>
          <th>Type</th>
          <th>Call/Put</th>
          <th>Strike</th>
          <th>Expiration</th>
          <th>Premium</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => (
          <StockOpenOptionRow option={option} />
        ))}
      </tbody>
    </table>
  );
};

export default StockOpenOptionsTable;
