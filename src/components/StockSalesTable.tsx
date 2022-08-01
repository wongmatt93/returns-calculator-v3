import StockSale from "../models/StockSale";
import StockSaleRow from "./StockSaleRow";
import "./StockSalesTable.css";

interface Props {
  stockSales: StockSale[];
}

const StockSalesTable = ({ stockSales }: Props) => {
  return (
    <table className="StockSalesTable">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Sold Amount</th>
          <th>Profit</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {stockSales.map((stockSale) => (
          <StockSaleRow stockSale={stockSale} />
        ))}
      </tbody>
    </table>
  );
};

export default StockSalesTable;
