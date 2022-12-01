import React from "react";
import TransactionList from "../TransactionList/TransactionList";
import { useSelector } from "react-redux";
import { selectTransactionsByCategory } from "../../store/transaction/selectors";
import { selectCategoryNameById } from "../../store/category/selectors";

const CategoryFilter = ({ filterQuery }) => {
  const transactionsByCategory = useSelector((state) =>
    selectTransactionsByCategory(state, filterQuery)
  );
  const categoryName = useSelector((state) =>
    selectCategoryNameById(state, filterQuery)
  );

  return transactionsByCategory.length ? (
    <TransactionList
      transactions={transactionsByCategory}
      title={`${categoryName} Transactions`}
    />
  ) : (
    <div className="TransactionList">
      <h3>Category Transactions</h3>
      <p>No Matching Transactions</p>
    </div>
  );
};

export default CategoryFilter;
