import { FormEvent, useState } from "react";
import Stock from "../models/Stock";
import "./AddStockForm.css";

interface Props {
  stocks: Stock[];
  onAddStock: (newStock: Stock) => void;
}

const AddStockForm = ({ stocks, onAddStock }: Props) => {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const newTicker = ticker.toUpperCase();
    if (stocks.find((stock) => stock.ticker === newTicker)) {
      alert(`${newTicker} has already been added`);
    } else {
      onAddStock({
        ticker: newTicker,
        quantity: 0,
        originalCostBasis: 0,
        currentCostBasis: 0,
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
      />
      <button>Add</button>
    </form>
  );
};

export default AddStockForm;
