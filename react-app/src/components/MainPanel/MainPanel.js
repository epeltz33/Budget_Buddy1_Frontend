import React from "react";
import { Route, Router } from "react-router-dom";
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
  const transactions = useSelector((state) => state.transactions.all); // Get the transactions from the store

  return (
    <div className="MainPanel">
      <Router>
        <Route exact path="/transactions">
          <TransactionList transactions={transactions} title={"Transactions"} />
        </Route>
        <Route path="/transactions/category/">
          <CategoryFilter filterQuery={filterQuery} />
        </Route>
        <Route path="/transactions/account/">
          <AccountFilter filterQuery={filterQuery} />
        </Route>
        <Route path="/transactions/date/">
          <DateFilter filterQuery={filterQuery} />
        </Route>
        <Route path="/transactions/payee/">
          {/*  <PayeeFilter filterQuery={filterQuery}/> */}
          <PayeeFilter filterQuery={filterQuery} />
        </Route>
        <Route path="/">
          <BudgetCard />
          <TransactionCard />
          <CategoryCard />
        </Route>
      </Router>
    </div>
  );
};

export default MainPanel;
