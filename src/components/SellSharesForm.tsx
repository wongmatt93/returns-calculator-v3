import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./SellSharesForm.css";
import Modal from "react-modal";
import React from "react";

interface Props {
  stock: Stock;
}

const SellSharesForm = ({ stock }: Props) => {
  const { sellShares } = useContext(StocksContext);
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (quantity > stock.quantity) {
      alert("You cannot sell more shares than you own");
    } else if (stock.quantity) {
      sellShares(stock, amount, quantity, date);
      setModalIsOpen(false);
    } else {
      alert("You don't own any shares");
    }
  };

  return (
    <div className="SellSharesForm">
      <button onClick={openModal} disabled={!stock.quantity}>
        Sell Shares
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="sell-shares-modal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="sell-shares-inputs">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="sell-shares-inputs">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="sell-shares-inputs">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Sell Shares</button>
        </form>
      </Modal>
    </div>
  );
};

export default SellSharesForm;
