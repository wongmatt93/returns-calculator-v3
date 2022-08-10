import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./SellSharesForm.css";

interface Props {
  stock: Stock;
}

const SellSharesForm = ({ stock }: Props) => {
  const { sellShares } = useContext(StocksContext);
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (quantity > stock.quantity) {
      alert("You cannot sell more shares than you own");
    } else if (stock.quantity) {
      sellShares(stock, amount, quantity, date);
    } else {
      alert("You don't own any shares");
    }
  };

  return (
    <form className="SellSharesForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
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
      <button>Sell Shares</button>
    </form>
  );
};

export default SellSharesForm;
