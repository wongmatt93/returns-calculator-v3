import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import Stock from "../models/Stock";
import { filterOptionsThatRequireStocks } from "../services/filterFunctions";
import "./AddOpenOptionsForm.css";
import Modal from "react-modal";
import React from "react";

interface Props {
  stock: Stock;
  options: Option[];
}

const AddOpenOptionsForm = ({ stock, options }: Props) => {
  const { addOpenOptions } = useContext(StocksContext);
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("bto");
  const [callPut, setCallPut] = useState<string>("c");
  const [strike, setStrike] = useState<string>("");
  const [premium, setPremium] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

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
          strike: parseFloat(strike),
          expirationDate: expiration,
          premium: parseFloat(premium),
          open: true,
        });
      }
      setModalIsOpen(false);
    }
  };

  return (
    <div className="AddOpenOptionsForm">
      <button onClick={openModal}>Open Options</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-open-options-modal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="add-open-options-inputs">
            <label htmlFor="date">Transaction Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
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
          </div>
          <div className="add-open-options-inputs">
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
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="strike">Strike Price</label>
            <input
              type="number"
              name="strike"
              id="strike"
              value={strike}
              onChange={(e) => setStrike(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="expiration">Expiration Date</label>
            <input
              type="date"
              name="expiration"
              id="expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="premium">Premium</label>
            <input
              type="text"
              name="premium"
              id="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <button>Add Option</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddOpenOptionsForm;
