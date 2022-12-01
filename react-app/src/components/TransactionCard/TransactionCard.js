import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currencyFormatter, dateConverter } from "../../utils";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import "./TransactionCard.css";

export default function TransactionCard() {
  const transactions = useSelector((state) => state.transactions.all);
  const categories = useSelector((state) => state.category);
  const accounts = useSelector((state) => state.account.byId);

  const transactions_monthly = transactions.filter(
    (transaction) =>
      parseInt(transaction.trans_date.slice(5, 7)) === today.getMonth() + 1
  );

  const today = new Date();

  const [editId, setEditId] = useState();

  return (
    <div className="TransactionCard">
      <h3>Recent Transactions</h3>
      <table>
        <col className="TableDate"></col>
        <col className="TablePayee"></col>
        <col className="TableAmount"></col>
        <col className="TableCategory"></col>
        <col className="TableAccount"></col>
        <col className="TableButtons"></col>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Account</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions_monthly.slice(0, 10).map((transaction) => (
            <tr key={transaction.id}>
              {editId !== transaction.id && (
                <>
                  <td>{dateConverter(transaction.trans_date)}</td>
                  <td>{transaction.trans_payee}</td>
                  <td>{currencyFormatter.format(transaction.trans_amount)}</td>
                  <td>
                    {categories[transaction.categoryId - 1]?.category_name}
                  </td>
                  <td>{accounts[transaction.accountId]?.account_name}</td>
                </>
              )}
              <TransactionEdit
                transaction={transaction}
                editId={editId}
                setEditId={setEditId}
                accounts={accounts}
                categories={categories}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
