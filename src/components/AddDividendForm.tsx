import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./AddDividendForm.css";

interface Props {
  stock: Stock;
}

const AddDividendForm = ({ stock }: Props) => {
  const { addDividend } = useContext(StocksContext);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    {
      stock.quantity
        ? addDividend({
            ticker: stock.ticker,
            amount: amount,
            date: date,
          })
        : alert("You cannot add dividends if you don't own shares");
    }
  };

  return (
    <form className="AddDividendForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button>Add Dividend</button>
    </form>
  );
};

export default AddDividendForm;
