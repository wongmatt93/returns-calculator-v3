import { FormEvent, useState } from "react";
import Option from "../models/Option";
import Stock from "../models/Stock";
import "./AddOptionsForm.css";

interface Props {
  indStock: Stock;
  onAddOpenOptions: (option: Option) => void;
}

const AddOptionsForm = ({ indStock, onAddOpenOptions }: Props) => {
  const [date, setDate] = useState("");
  const [type, setType] = useState("bto");
  const [callPut, setCallPut] = useState("c");
  const [strike, setStrike] = useState(0);
  const [premium, setPremium] = useState(0);
  const [expiration, setExpiration] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onAddOpenOptions({
      ticker: indStock.ticker,
      transactionDate: date,
      callPut: callPut,
      type: type,
      strike: strike,
      expirationDate: expiration,
      premium: premium,
      open: true,
    });
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
      <button>Add Option</button>
    </form>
  );
};

export default AddOptionsForm;
