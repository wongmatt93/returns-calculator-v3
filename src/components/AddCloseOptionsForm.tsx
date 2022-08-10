import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import Stock from "../models/Stock";
import {
  filterOpenOptions,
  filterStockOptions,
  removeClosedPositions,
} from "../services/filterFunctions";
import "./AddCloseOptionsForm.css";

interface Props {
  stock: Stock;
}

const AddCloseOptionsForm = ({ stock }: Props) => {
  const { options, addCloseOptions } = useContext(StocksContext);
  const [quantity, setQuantity] = useState(0);
  const [premium, setPremium] = useState<string>("");
  const [date, setDate] = useState("");
  const openOptions = removeClosedPositions(
    filterOpenOptions(filterStockOptions(stock, options))
  );

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (openOptions.length) {
      const type: string = openOptions[0].type === "bto" ? "stc" : "btc";
      const closeOption: Option = {
        ticker: openOptions[0].ticker,
        transactionDate: date,
        callPut: openOptions[0].callPut,
        type: type,
        strike: openOptions[0].strike,
        expirationDate: openOptions[0].expirationDate,
        premium: parseFloat(premium),
      };
      addCloseOptions(options, openOptions, closeOption, quantity);
      console.log(openOptions);
    } else {
      alert("No positions to close");
    }
  };

  return (
    <div className="AddCloseOptionsForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <label htmlFor="premium">Premium</label>
        <input
          type="text"
          name="premium"
          id="premium"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
        />
        <label htmlFor="date">Transaction Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddCloseOptionsForm;
