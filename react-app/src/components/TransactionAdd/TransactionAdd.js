import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../../store/transaction/transaction";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "./TransactionAdd.css";
import Backdrop from "../Backdrop/Backdrop";

export default function AccountAdd({ accounts, setIsAdd, categories }) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [date, setDate] = useState("");
  const [payee, setPayee] = useState("");

  const dispatch = useDispatch();

  const reset = () => {
    setAmount("");
    setCategoryId("");
    setAccountId("");
    setDate("");
    setPayee("");
    setIsAdd(false); // close modal when done
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payee) {
      return alert("Please enter a payee");
    }
    const today = new Date();

    if (!amount) {
      return alert("Please enter a amount");
    }
    if (!date) {
      return alert("Please enter a date");
    }
    if (new Date(date) > today) {
      return alert("Please enter a valid date");
    }

    const newTransaction = {
      trans_date: date,
      trans_amount: amount,
      trans_payee: payee,
      category_id: categoryId,
      account_id: accountId,
    };
    dispatch(createTransaction(newTransaction)); // dispatch action to create transaction in db and store
    reset(); // reset form
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return ReactDOM.createPortal(
    //  create portal to render modal on top of page content
    <Backdrop Onclick={reset}>
      <motion.div
        key="Transaction-Form"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="TransactionForm" onSubmit={handleSubmit}>
          <h3>
            <i className="fa-solid fa-money-bill-wave" /> New Transaction
          </h3>
          <div>
            <label htmlFor="date"> Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
            />
          </div>
          <div>
            <label htmlFor="payee"> Payee</label>
            <input
              type="text"
              onChange={(e) => setPayee(e.target.value)}
              value={payee}
              name="payee"
            />
          </div>
          <div>
            <label htmlFor="amount"> Amount</label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
            />
          </div>
          <div>
            <label htmlFor="categoryId"> Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
            >
              <option value="" selected disabled hidden></option>
              {Object.values(categories)
                .slice(1)
                .map((category) => (
                  <option value={category.id}>{category.category_name}</option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="accountId"> Account</label>
            <select
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
            >
              <option value="" selected disabled hidden></option>
              {Object.values(accounts).map((account) => (
                <option value={account.id}>{account.account_name}</option>
              ))}
            </select>
          </div>
          <div className="TransactionFormButtons">
            <span>
              <button className="submit-button" type="submit">
                Save
              </button>
            </span>
            <span>
              <button className="close-button" type="reset" onClick={reset}>
                Close
              </button>
            </span>
          </div>
        </form>
      </motion.div>
    </Backdrop>,
    document.getElementById("root")
  );
}
