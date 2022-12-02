import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountList from "../AccountList/AccountList";
import TransactionFilter from "../TransactionFilter/TransactionFilter";
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import { getBudgets } from "../../store/budget/budget";
import { getTransactions } from "../../store/transaction/transaction";
import { getCategories } from "../../store/category/category";
import { getAccounts } from "../../store/account/account";
import { AnimatePresence } from "framer-motion";
import "./SidePanel.css";

const SidePanel = () => {
  const dispatch = useDispatch();

  const [isMax, setIsMax] = useState(false); // this is a boolean that is used to determine whether the side panel is maximized or minimized
  const [isAdd, setIsAdd] = useState(false);
  const [filterStyle, setFilterStyle] = useState("hide");

  const [filterType, setFilterType] = useState();
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    // this useEffect is used to dispatch the thunk actions that will fetch all of the data from the database and store it in the redux store
    dispatch(getAccounts());
    dispatch(getTransactions());
    dispatch(getBudgets());
    dispatch(getCategories());
  }, [dispatch]);

  const accounts = useSelector((state) => state.account.all);
  const categories = useSelector((state) => state.category);

  const toggleMax = (e) => {
    // toggle max/minimize side panel
    e.stopPropagation();
    setIsMax(!isMax);
  };

  const toggleAdd = (e) => {
    // toggle add transaction modal
    e.stopPropagation();
    if (!accounts.length)
      // if there are no accounts in the redux store, do not allow the user to add a transaction
      return alert(
        "You must create an account before creating any transactions."
      );
    setIsAdd(!isAdd);
  };

  const filterCatClick = (e) => {
    // toggle filter by category modal
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("category");
  };

  const filterAccClick = (e) => {
    // toggle filter by account modal
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("account");
  };

  const filterDateClick = (e) => {
    // toggle filter by date modal
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("date");
  };

  const filterPayeeClick = (e) => {
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("payee");
  };

  const filterShowClick = (e) => {
    e.stopPropagation();
    filterStyle === "hide" ? setFilterStyle("") : setFilterStyle("hide"); // toggle filter show/hide button
  };

  return (
    <div className="SidePanel" id={isMax ? "MaxSidePanel" : "MinSidePanel"}>
      <span id={"SideMax"}>
        <button onClick={toggleMax}>
          <i
            className={
              isMax
                ? "fa-solid fa-window-minimize"
                : "fa-solid fa-window-maximize"
            }
          />
        </button>
      </span>
      <AccountList isMax={isMax} />
      <div className="Transactions">
        <h3>Transactions</h3>
        <button className="NewTransactionButton" onClick={toggleAdd}>
          <i className="fa-solid fa-square-plus" /> Add
        </button>
        <AnimatePresence
          key="new-transaction-modal" // this is a key that is used to make sure that the modal is only rendered when the user clicks the add transaction button
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isAdd && (
            <TransactionAdd
              accounts={accounts}
              setIsAdd={setIsAdd}
              categories={categories}
            />
          )}
        </AnimatePresence>
        <ul>
          <li>
            <i className="fas fa-money-bill-wave" />{" "}
            <NavLink to="/transactions">All</NavLink>
          </li>
          <li style={{ cursor: "pointer" }} onClick={filterShowClick}>
            <i className="fa-solid fa-money-bill-wave" /> Filter
            <ul className={filterStyle}>
              <li>
                <i className="fa-solid fa-filter" />{" "}
                <span className="FilterButtons" onClick={filterCatClick}>
                  by Category
                </span>
              </li>
              <li>
                <i className="fa-solid fa-filter" />{" "}
                <span className="FilterButtons" onClick={filterAccClick}>
                  by Account
                </span>
              </li>
              <li>
                <i className="fa-solid fa-filter" />{" "}
                <span className="FilterButtons" onClick={filterDateClick}>
                  by Date
                </span>
              </li>
              <li>
                <i className="fa-solid fa-filter" />{" "}
                <span className="FilterButtons" onClick={filterPayeeClick}>
                  by Payee
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <AnimatePresence
        key="filter-modal"
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isFilter && (
          <TransactionFilter
            filterType={filterType}
            setIsFilter={setIsFilter}
            categories={categories}
            accounts={accounts}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidePanel;
