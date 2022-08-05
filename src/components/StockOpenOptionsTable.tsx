import Option from "../models/Option";
import StockOpenOptionRow from "./StockOpenOptionRow";
import "./StockOpenOptionsTable.css";

interface Props {
  options: Option[];
}

const StockOpenOptionsTable = ({ options }: Props) => {
  const res: { [key: string]: any } = {};
  options.forEach((option) => {
    const key = `${option.ticker}${option["callPut"]}${option["type"]}${option["strike"]}${option["expirationDate"]}${option["open"]}`;
    if (!res[key]) {
      res[key] = { ...option, count: 0 };
    }
    res[key].count += 1;
  });
  const optionsByQuantity: Option[] = Object.values(res);

  return (
    <table className="StockOpenOptionsTable">
      <thead>
        <tr>
          <th>Type</th>
          <th>Call/Put</th>
          <th>Strike</th>
          <th>Expiration</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {optionsByQuantity.map((option) => (
          <StockOpenOptionRow option={option} />
        ))}
      </tbody>
    </table>
  );
};

export default StockOpenOptionsTable;
