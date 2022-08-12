import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Option from "../models/Option";
import "./AddCloseOptionsForm.css";
import Modal from "react-modal";
import React from "react";
import OptionDisplay from "../models/OptionDisplay";

interface Props {
  optionDisplay: OptionDisplay;
}

const AddCloseOptionsForm = ({ optionDisplay }: Props) => {
  const { options, addCloseOptions } = useContext(StocksContext);
  const [quantity, setQuantity] = useState(0);
  const [premium, setPremium] = useState<string>("");
  const [date, setDate] = useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  Modal.setAppElement("#root");

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (optionDisplay.quantity) {
      const newOption: Option = {
        ticker: optionDisplay.ticker,
        transactionDate: date,
        callPut: optionDisplay.callPut,
        type: optionDisplay.type === "sto" ? "btc" : "stc",
        strike: optionDisplay.strike,
        expirationDate: optionDisplay.expirationDate,
        premium: parseInt(premium),
      };
      addCloseOptions(options, optionDisplay.quantity, newOption, quantity);
      setModalIsOpen(false);
    } else {
      alert("No positions to close");
    }
  };

  return (
    <div className="AddCloseOptionsForm">
      <button onClick={openModal}>Close Positions</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-close-options-modal"
        overlayClassName="add-close-options-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="add-close-options-inputs">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="add-close-options-inputs">
            <label htmlFor="premium">Premium</label>
            <input
              type="text"
              name="premium"
              id="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>
          <div className="add-close-options-inputs">
            <label htmlFor="date">Transaction Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCloseOptionsForm;
