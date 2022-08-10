import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./AddStockForm.css";

// interface Props {
//   stocks: Stock[];
//   onAddStock: (newStock: Stock) => void;
// }

const AddStockForm = () => {
  const { stocks, addStock } = useContext(StocksContext);
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const newTicker = ticker.toUpperCase();
    if (stocks.find((stock) => stock.ticker === newTicker)) {
      alert(`${newTicker} has already been added`);
    } else {
      addStock({
        ticker: newTicker,
        quantity: 0,
        costBasis: 0,
        cashReturn: 0,
      });
    }
  };

  return (
    <form className="AddStockForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="ticker">Stock Ticker</label>
      <input
        type="text"
        name="ticker"
        id="ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
};

export default AddStockForm;
