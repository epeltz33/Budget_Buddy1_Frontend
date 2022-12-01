import React from "react";
import { useSelector } from "react-redux";
import TransactionList from "../TransactionList/TransactionList";
import { selectTransactionsByAccount } from "../../store/transaction/selectors";
import { selectAccountNameById } from "../../store/account/selectors";

const AccountFilter = ({ filterQuery }) => {
  const transactionsByAccount = useSelector((state) =>
    selectTransactionsByAccount(state, filterQuery)
  );
  const accountName = useSelector((state) =>
    selectAccountNameById(state, filterQuery)
  );
  return transactionsByAccount.length ? (
    <TransactionList
      transactions={selectTransactionsByAccount}
      title={`${accountName} Transactions`}
    />
  ) : (
    <div className="TransactionList">
      <h2>No transactions found for {accountName}</h2>
    </div>
  );
};

export default AccountFilter;
