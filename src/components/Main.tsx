import { useContext } from "react";
import StocksContext from "../context/StocksContext";
import AddStockForm from "./AddStockForm";
import "./Main.css";
import StockTable from "./StockTable";
import Totals from "./Totals";

const Main = () => {
  const { stocks } = useContext(StocksContext);

  return (
    <main className="Main">
      <Totals stocks={stocks} />
      <AddStockForm />
      <StockTable stocks={stocks} />
    </main>
  );
};

export default Main;
