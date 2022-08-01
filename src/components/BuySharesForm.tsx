import { FormEvent, useState } from "react";
import Stock from "../models/Stock";
import "./BuySharesForm.css";

interface Props {
  indStock: Stock;
  onBuyShares: (stock: Stock, quantity: number, cost: number) => void;
}

const BuySharesForm = ({ indStock, onBuyShares }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onBuyShares(indStock, quantity, cost);
  };

  return (
    <form className="BuySharesForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <label htmlFor="cost">Cost</label>
      <input
        type="number"
        name="cost"
        id="cost"
        value={cost}
        onChange={(e) => setCost(parseInt(e.target.value))}
      />
      <button>Buy Shares</button>
    </form>
  );
};

export default BuySharesForm;
