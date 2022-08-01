import { FormEvent, useState } from "react";
import Stock from "../models/Stock";
import "./SellSharesForm.css";

interface Props {
  indStock: Stock;
  onSellShares: (
    stock: Stock,
    amount: number,
    quantity: number,
    date: string
  ) => void;
}

const SellSharesForm = ({ indStock, onSellShares }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (quantity > indStock.quantity) {
      alert("You cannot sell more shares than you own");
    } else {
      onSellShares(indStock, amount, quantity, date);
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
