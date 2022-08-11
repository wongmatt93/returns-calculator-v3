import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./AddDividendForm.css";
import Modal from "react-modal";
import React from "react";

interface Props {
  stock: Stock;
}

const AddDividendForm = ({ stock }: Props) => {
  const { addDividend } = useContext(StocksContext);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  Modal.setAppElement("#root");

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (stock.quantity) {
      addDividend({
        ticker: stock.ticker,
        amount: amount,
        date: date,
      });
      setModalIsOpen(false);
    } else {
      alert("You cannot add dividends if you don't own shares");
    }
  };

  return (
    <div className="AddDividendForm">
      <button onClick={openModal} disabled={!stock.quantity}>
        Add Dividends
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-dividend-modal"
        overlayClassName="add-dividend-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="dividend-inputs">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="dividend-inputs">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Add Dividend</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddDividendForm;
