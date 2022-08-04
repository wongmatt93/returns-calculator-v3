import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import Stock from "../models/Stock";
import { filterOptionsThatRequireStocks } from "../services/filterFunctions";
import "./AddOptionsForm.css";

interface Props {
  stock: Stock;
  options: Option[];
}

const AddOptionsForm = ({ stock, options }: Props) => {
  const { addOpenOptions } = useContext(StocksContext);
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("bto");
  const [callPut, setCallPut] = useState<string>("c");
  const [strike, setStrike] = useState<number>(0);
  const [premium, setPremium] = useState<number>(0);
  const [expiration, setExpiration] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const maxQuantity: number = filterOptionsThatRequireStocks(options).length;
    if (
      (type === "sto" &&
        callPut === "c" &&
        quantity * 100 > stock.quantity - maxQuantity * 100) ||
      (type === "bto" &&
        callPut === "p" &&
        quantity * 100 > stock.quantity - maxQuantity * 100)
    ) {
      alert("You do not own enough shares");
    } else {
      for (let i: number = 0; i < quantity; i++) {
        addOpenOptions({
          ticker: stock.ticker,
          transactionDate: date,
          callPut: callPut,
          type: type,
          strike: strike,
          expirationDate: expiration,
          premium: premium,
          open: true,
        });
      }
    }
  };

  return (
    <form className="AddOptionsForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="date">Transaction Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="type">Transaction Type</label>
      <select
        name="type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="bto">Buy To Open</option>
        <option value="sto">Sell To Open</option>
      </select>
      <label htmlFor="callPut">Call/Put</label>
      <select
        name="callPut"
        id="callPut"
        value={callPut}
        onChange={(e) => setCallPut(e.target.value)}
      >
        <option value="c">Call</option>
        <option value="p">Put</option>
      </select>
      <label htmlFor="strike">Strike Price</label>
      <input
        type="number"
        name="strike"
        id="strike"
        value={strike}
        onChange={(e) => setStrike(parseInt(e.target.value))}
      />
      <label htmlFor="expiration">Expiration Date</label>
      <input
        type="date"
        name="expiration"
        id="expiration"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      />
      <label htmlFor="premium">Premium</label>
      <input
        type="number"
        name="premium"
        id="premium"
        value={premium}
        onChange={(e) => setPremium(parseInt(e.target.value))}
      />
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button>Add Option</button>
    </form>
  );
};

export default AddOptionsForm;
