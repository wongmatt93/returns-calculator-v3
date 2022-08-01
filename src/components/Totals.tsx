import Stock from "../models/Stock";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import "./Totals.css";

interface Props {
  stocks: Stock[];
}

const Totals = ({ stocks }: Props) => {
  const costBasis = stocks.reduce((pv, cv) => pv + cv.currentCostBasis, 0);
  const cashReturn = stocks.reduce((pv, cv) => pv + cv.cashReturn, 0);
  const percentReturn = costBasis
    ? formatPercent(cashReturn, costBasis)
    : "N/A";

  return (
    <table className="Totals">
      <thead>
        <tr>
          <th>Total Cost Basis</th>
          <th>Total Cash Return</th>
          <th>Total Percent Return</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatMoney(costBasis)}</td>
          <td>{formatMoney(cashReturn)}</td>
          <td>{percentReturn}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Totals;
