import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import { useFilter } from "../../context/FilterContext";
import { selectUniquePayees } from "../../store/transaction/selectors";
import "react-datepicker/dist/react-datepicker.css";
import "./TransactionFilter.css";

export default function TransactionFilter({
  //  this is the modal that pops up when you click the filter button on the transaction list page
  filterType,
  setIsFilter,
  accounts,
  categories,
}) {
  const history = useNavigate();

  const { setFilterQuery } = useFilter(); //  get the filter query from the context and set the filter query

  const [categoryId, setCategoryId] = useState(2);
  const [accountId, setAccountId] = useState(1);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [payeeQuery, setPayeeQuery] = useState("");

  const reset = () => {
    setIsFilter(false);
    setCategoryId(2); // 2 is the default category id
    setAccountId(1); // 1 is the default account id
    setStartDate(new Date());
    setEndDate(null);
    setPayeeQuery("");
  };

  const filterCatClick = (e) => {
    e.preventDefault();
    setFilterQuery(categoryId);
    reset();
    history.push("/transactions/category");
  };

  const filterAccClick = (e) => {
    e.preventDefault();
    setFilterQuery(accountId);
    reset();
    history.push("/transactions/account");
  };

  const filterDateClick = (e) => {
    e.preventDefault();
    reset();
    if (endDate) {
      const firstDateString = `${startDate.getFullYear()}${(
        "0" + (startDate.getMonth() + 1).toString()
      ).slice(-2)}${startDate.getDate()}`;
      const secondDateString = `${endDate.getFullYear()}${(
        "0" + (endDate.getMonth() + 1).toString()
      ).slice(-2)}${endDate.getDate()}`;
      setFilterQuery(`${firstDateString + "&" + secondDateString}`);
      history.push("/transactions/date");
    } else {
      const firstDateString = `${startDate.getFullYear()}${(
        "0" + (startDate.getMonth() + 1).toString()
      ).slice(-2)}${startDate.getDate()}`;
      setFilterQuery(`${firstDateString}`);
      history.push("/transactions/date");
    }
  };

  const filterPayeeClick = (e) => {
    e.preventDefault();
    setFilterQuery(payeeQuery);
    reset();
    history.push("/transactions/payee");
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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

  const accountList = useMemo(
    () =>
      accounts.map((account) => (
        <option value={account.id}>{account.account_name}</option>
      )),
    [accounts]
  );

  const categoryList = useMemo(
    () =>
      categories
        .slice(1)
        .map((category) => (
          <option value={category.id}>{category.category_name}</option>
        )),
    [categories]
  );

  const payees = useSelector(selectUniquePayees);

  const formSwitch = (filterType) => {
    switch (filterType) {
      case "category":
        return (
          <form>
            <h3>
              <i className="fa-solid fa-money-bill-wave" /> Transactions
            </h3>
            <label>by Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
              id="CategoryFilter"
            >
              {categoryList}
            </select>
            <span className="TransactionFilterButtons">
              <button onClick={(e) => filterCatClick(e)}>Filter</button>
              <button type="reset" onClick={reset}>
                Close
              </button>
            </span>
          </form>
        );
      case "account":
        return (
          <form>
            <h3>
              <i className="fa-solid fa-money-bill-wave" /> Transactions
            </h3>
            <label>by Account</label>
            <select
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
              id="AccountFilter"
            >
              {accountList}
            </select>
            <span className="TransactionFilterButtons">
              <button onClick={(e) => filterAccClick(e)}>Filter</button>
              <button type="reset" onClick={reset}>
                Close
              </button>
            </span>
          </form>
        );
      case "date":
        return (
          <div>
            <h3>
              <i className="fa-solid fa-money-bill-wave" /> Transactions
            </h3>
            <span className="TransactionFilterText">by Date</span>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              selectsRange
              inline
            />
            <span className="TransactionFilterButtons">
              <button onClick={filterDateClick}>Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </div>
        );
      case "payee":
        return (
          <div>
            <h3>
              <i className="fa-solid fa-money-bill-wave" /> Transactions
            </h3>
            <label>by Payee</label>
            <input
              onChange={(e) => setPayeeQuery(e.target.value)}
              value={payeeQuery}
              name="payeeQuery"
              list="payee_names"
              autoComplete="off"
              autoFocus
            />
            <datalist id="payee_names">
              {payees.map((payee) => (
                <option value={`${payee}`}></option>
              ))}
            </datalist>
            <span className="TransactionFilterButtons">
              <button onClick={filterPayeeClick}>Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <Backdrop onClick={reset}>
      <motion.div
        key="Category-Filter"
        className="TransactionFilter"
        id={filterType === "date" ? "TransactionFilterDate" : ""}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {formSwitch(filterType)}
      </motion.div>
    </Backdrop>,
    document.getElementById("root")
  );
}
