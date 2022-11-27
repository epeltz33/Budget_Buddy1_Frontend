import React from "react";
import { useSelector } from "react-redux";
import TransactionList from "../TransactionList/TransactionList";
import { selectTransactionsByDate } from "../../store/transaction/selectors";

const DateFilter = ({ filterQuery }) => {
  const transactionsByDate = useSelector((state) =>
    selectTransactionsByDate(state, filterQuery)
  );

  const firstDateMonth =
    filterQuery.indexOf("&") === -1
      ? parseInt(filterQuery.slice(4, 6))
      : parseInt(filterQuery.slice("&")[0].slice(4, 6)); // 4, 6 is the month in the date string

  const firstDateYear =
    filterQuery.indexOf("&") === -1
      ? parseInt(filterQuery.slice(0, 4)) // 0, 4 is the year in the date string
      : parseInt(filterQuery.slice("&")[0].slice(0, 4));

  const firstDateDay =
    filterQuery.indexOf("&") === -1
      ? parseInt(filterQuery.slice(6)) // 6 is the day in the date string
      : parseInt(filterQuery.slice("&")[0].slice(6));

  const secondDateMonth =
    filterQuery.indexOf("&") === -1
      ? null
      : parseInt(filterQuery.slice("&")[1].slice(4, 6));

  const secondDateYear =
    filterQuery.indexOf("&") === -1
      ? null
      : parseInt(filterQuery.slice("&")[1].slice(0, 4));

  const secondDateDay =
    filterQuery.indexOf("&") === -1
      ? null
      : parseInt(filterQuery.slice("&")[1].slice(6));

  // const firstDate = new Date(Date.UTC(firstDateYear, firstDateMonth - 1, firstDateDay));
  const secondDate =
    filterQuery.indexOf("&") === -1
      ? null
      : new Date(Date.UTC(secondDateYear, secondDateMonth - 1, secondDateDay)); // -1 because months are 0 indexed

  const myDateToString = (year, month, day) => {
    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return `${months[month]} ${day}, ${year}`; // returns a string of the date in the format of "Month Day, Year"
  };

  const dates = !secondDate
    ? myDateToString(firstDateYear, firstDateMonth, firstDateDay)
    : myDateToString(firstDateYear, firstDateMonth, firstDateDay) +
      " to " +
      myDateToString(secondDateYear, secondDateMonth, secondDateDay);

  return transactionsByDate.length ? (
    <TransactionList
      transactions={transactionsByDate}
      title={`Transactions on ${dates}`}
    />
  ) : (
    <div className="TransactionList">
      <h2>Transactions on {dates}</h2>
      <p>No Transactions Match</p>
    </div>
  );
};

export default DateFilter;
