import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { currencyFormatter, dateConverter, tableSorter } from "../../utils";
import { useFilter } from "../../context/FilterContext";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import "./TransactionList.css";

const TransactionList = ({ transactions, title }) => {
  const history = useHistory();

  const { filterQuery } = useFilter();

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [editId, setEditId] = useState();

  useEffect(() => {
    addSort();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return history.listen(() => {
      removeSortClass();
    });
  }, [history]);

  useEffect(() => {
    removeSortClass();
  }, [filterQuery]);

  const addSort = () => {
    document.querySelectorAll("th").forEach((header) => {
      //  add sort class to all table headers for the header row
      header.addEventListener("click", () => {
        const table = header.parentElement.parentElement.parentElement; // get the table element
        const index = Array.prototype.indexOf.call(
          header.parentElement.children,
          header
        ); // get the index of the header
        const asc = header.classList.contains("th-sort-asc"); // check if the header is sorted ascending or descending (default is descending)

        tableSorter(table, index, !asc); // sort the table by the index and ascending or descending order if the header is already sorted
      });
    });
  };

  const removeSortClass = () => {
    // remove sort class from all table headers
    document.querySelectorAll("th").forEach((header) => {
      const table = header.parentElement.parentElement.parentElement;
      table
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
    });
  };

  return (
    //  render the table with the transactions
    <div className="TransactionList">
      <h3>{title}</h3>
      <table>
        <colgroup>
          <col className="TableDate"></col>
          <col className="TableCategory"></col>
          <col className="TableAmount"></col>
          <col className="TablePayee"></col>
          <col className="TableAccount"></col>
          <col className="TableButtons"></col>
        </colgroup>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Account</th>
            <th className="TableButtons"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
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
};

export default TransactionList;
