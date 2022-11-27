import React from "react";
import { useSelector } from "react-redux";
import { selectTransactionsByPayee } from "../../store/transaction/selectors";
import TransactionList from "../TransactionList/TransactionList";

const PayeeFilter = ({ filterQuery }) => {
  const transactionsByPayee = useSelector((state) =>
    selectTransactionsByPayee(state, filterQuery)
  );

  return (
    <div>
      <h1>Transactions by Payee</h1>
      <TransactionList transactions={transactionsByPayee} />
    </div>
  );
};

export default PayeeFilter;
