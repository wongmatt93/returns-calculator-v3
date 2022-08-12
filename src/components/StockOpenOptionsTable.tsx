import Option from "../models/Option";
import OptionDisplay from "../models/OptionDisplay";
import { removeClosedPositions } from "../services/filterFunctions";
import StockOpenOptionRow from "./StockOpenOptionRow";
import "./StockOpenOptionsTable.css";

interface Props {
  options: Option[];
}

const StockOpenOptionsTable = ({ options }: Props) => {
  const res: { [key: string]: any } = {};
  const onlyOpenOptions: Option[] = removeClosedPositions(options);
  onlyOpenOptions.forEach((option) => {
    const key = `${option.ticker}${option["callPut"]}${option["type"]}${option["strike"]}${option["expirationDate"]}${option["open"]}`;
    if (!res[key]) {
      res[key] = {
        ticker: option.ticker,
        callPut: option.callPut,
        type: option.type,
        strike: option.strike,
        expirationDate: option.expirationDate,
        quantity: 0,
      };
    }
    res[key].quantity += 1;
  });
  const optionsByQuantity: OptionDisplay[] = Object.values(res);

  return (
    <table className="StockOpenOptionsTable">
      <caption>Open Options Positions</caption>
      <thead>
        <tr>
          <th className="option-type">Type</th>
          <th className="option-name">Option</th>
          <th className="option-quantity">Quantity</th>
          <th className="option-status">Close?</th>
        </tr>
      </thead>
      <tbody>
        {onlyOpenOptions.length ? (
          optionsByQuantity.map((option) => (
            <StockOpenOptionRow option={option} />
          ))
        ) : (
          <tr>
            <td colSpan={6}>No Open Options</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StockOpenOptionsTable;
