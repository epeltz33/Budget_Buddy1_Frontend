import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../store/transaction/transaction";
import "./TransactionDelete.css";

export default function TransactionDelete({ oldTransaction }) {
  // oldTransaction is the transaction to be deleted (passed in from TransactionEdit.js)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(oldTransaction));
  };

  return (
    <div className="TransactionDelete">
      <button className="TransactionDeleteButton" onClick={handleSubmit}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}
