import { FormEvent, useContext, useState } from "react";
import StocksContext from "../context/StocksContext";
import Stock from "../models/Stock";
import "./BuySharesForm.css";
import Modal from "react-modal";
import React from "react";

interface Props {
  stock: Stock;
}

const BuySharesForm = ({ stock }: Props) => {
  const { buyShares } = useContext(StocksContext);
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    buyShares(stock, {
      ticker: stock.ticker,
      quantity: quantity,
      cost: cost,
      date: date,
    });
    setModalIsOpen(false);
  };

  return (
    <div className="BuySharesForm">
      <button onClick={openModal}>Buy Shares</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="buy-shares-modal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="buy-shares-inputs">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="buy-shares-inputs">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
            />
          </div>
          <div className="buy-shares-inputs">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Buy Shares</button>
        </form>
      </Modal>
    </div>
  );
};

export default BuySharesForm;
