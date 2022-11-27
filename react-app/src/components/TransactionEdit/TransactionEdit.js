import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTransaction } from "../../store/transaction/transaction";
import TransactionDelete from "../TransactionDelete/TransactionDelete";
import "./TransactionEdit.css";
// Initialize the edit form with the transaction's data. If the user
// cancels the edit, restore the original transaction data.
export default function TransactionEdit({
  transaction,
  editId,
  setEditId,
  accounts,
  categories,
}) {
  const [date, setDate] = useState(transaction.trans_date);
  const [payee, setPayee] = useState(transaction.trans_payee);
  const [amount, setAmount] = useState(transaction.trans_amount);
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [accountId, setAccountId] = useState(transaction.accountId);

  const dispatch = useDispatch();

  const reset = () => {
    setEditId(); // clear the editId
    setDate(transaction.trans_date);
    setPayee(transaction.trans_payee);
    setAmount(transaction.trans_amount);
    setCategoryId(transaction.categoryId);
    setAccountId(transaction.accountId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      return alert("You must enter a date.");
    }

    const today = new Date();

    if (new Date(date) > today) {
      return alert("You must enter a date that is not in the future.");
    }

    if (!payee) {
      return alert("You must enter a payee name or description.");
    }

    if (!amount) {
      return alert("You must enter an amount for the transaction.");
    }

    const editTransaction = {
      id: transaction.id,
      trans_date: date,
      trans_payee: payee,
      trans_amount: amount,
      categoryId,
      accountId,
    };
    dispatch(updateTransaction(editTransaction));
    // reset();
    setEditId();
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setEditId(transaction.id);
  };

  return (
    <>
      {editId !== transaction.id && (
        <>
          <td>
            <div className="editButtons">
              <span>
                <button onClick={toggleEdit}>
                  <i class="fa-solid fa-pen-to-square" />
                </button>
              </span>
              <span>
                <TransactionDelete oldTransaction={transaction} />
              </span>
            </div>
          </td>
        </>
      )}

      {editId === transaction.id && (
        <>
          <form
            id="Edit"
            type="hidden"
            className="TransactionEditForm"
            onSubmit={handleSubmit}
          ></form>
          <td>
            <input
              form="Edit"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={new Date(date).toISOString().substring(0, 10)}
              name="date"
            />
          </td>
          <td>
            <input
              form="Edit"
              type="text"
              onChange={(e) => setPayee(e.target.value)}
              value={payee}
              name="payee"
            />
          </td>
          <td>
            <input
              form="Edit"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
            />
          </td>
          <td>
            <select
              form="Edit"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
              id="CategorySelect"
            >
              {Object.values(categories)
                .slice(1)
                .map((category) => (
                  <option value={category.id}>{category.category_name}</option>
                ))}
            </select>
          </td>
          <td>
            <select
              form="Edit"
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
              id="AccountSelect"
            >
              {Object.values(accounts).map((account) => (
                <option value={account.id}>{account.account_name}</option>
              ))}
            </select>
          </td>
          <td>
            <div className="saveButtons">
              <span>
                <button className="submit-button" type="submit" form="Edit">
                  <i class="fa-solid fa-floppy-disk" />
                </button>
              </span>
              <span>
                <button className="cancel-button" type="reset" onClick={reset}>
                  <i class="fa-solid fa-square-xmark" />
                </button>
              </span>
            </div>
          </td>
        </>
      )}
    </>
  );
}
