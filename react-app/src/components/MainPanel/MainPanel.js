import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFilter } from "../../context/FilterContext";
import AccountFilter from "../Filters/AccountFilter";
import DateFilter from "../Filters/DateFilter";
import PayeeFilter from "../Filters/PayeeFilter";
import CategoryFilter from "../Filters/CategoryFilter";
import BudgetCard from "../BudgetCard/BudgetCard";
import TransactionCard from "../TransactionCard/TransactionCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import TransactionList from "../TransactionList/TransactionList";
import "./MainPanel.css";

const MainPanel = () => {
  const { filterQuery } = useFilter(); // Get the filter query from the context provider
  const transactions = useSelector((state) => state.transaction?.all || []); // Get the transactions from the store
  console.log("test");
  return (
    <div className="MainPanel">
      <Routes>
        <Route
          //exact
          path="/transactions"
          element={
            <TransactionList
              transactions={transactions}
              title={"Transactions"}
            />
          }
        />
        <Route
          path="/transactions/category/"
          element={<CategoryFilter transactions={transactions} />}
        />
        <Route
          path="/transactions/account/"
          element={<AccountFilter transactions={transactions} />}
        />
        <Route
          path="/transactions/date/"
          element={<DateFilter transactions={transactions} />}
        />
        <Route
          path="/transactions/payee/"
          element={<PayeeFilter transactions={transactions} />}
        />
        <Route
          path="/"
          element={
            <>
              <BudgetCard />
              <TransactionCard />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default MainPanel;
