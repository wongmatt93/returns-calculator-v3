import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./BuySharesForm.css";

interface Props {
  stock: Stock;
}

const BuySharesForm = ({ stock }: Props) => {
  const { buyShares } = useContext(StocksContext);
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    buyShares(stock, {
      ticker: stock.ticker,
      quantity: quantity,
      cost: cost,
      date: date,
    });
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
      <label htmlFor="date">Cost</label>
      <input
        type="date"
        name="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button>Buy Shares</button>
    </form>
  );
};

export default BuySharesForm;
