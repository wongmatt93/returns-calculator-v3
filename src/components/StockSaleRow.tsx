import StockSale from "../models/StockSale";
import { formatMoney } from "../services/formatFunctions";
import "./StockSaleRow.css";

interface Props {
  stockSale: StockSale;
}

const StockSaleRow = ({ stockSale }: Props) => {
  return (
    <tr className="StockSaleRow">
      <td>{stockSale.quantity}</td>
      <td>{formatMoney(stockSale.soldAmount)}</td>
      <td>{formatMoney(stockSale.profit)}</td>
      <td>{stockSale.date}</td>
    </tr>
  );
};

export default StockSaleRow;
