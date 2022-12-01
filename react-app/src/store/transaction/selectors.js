import { createSelector } from "reselect";

const transactions = (state) => state.transaction.all;

export const selectTransactionsByCategory = createSelector(
  [transactions, (state, categoryId) => categoryId],
  (transactions, categoryId) =>
    transactions.filter((transaction) => transaction.categoryId === +categoryId)
);

export const selectTransactionsByAccount = createSelector(
  [transactions, (state, accountId) => accountId],
  (transactions, accountId) =>
    transactions.filter((transaction) => transaction.accountId === +accountId)
);

export const selectTransactionsByDate = createSelector(
  [transactions, (state, dateQuery) => dateQuery],
  (transactions, dateQuery) => {
    const isRange = dateQuery.indexOf("&") !== -1;

    const firstDateYear = isRange
      ? parseInt(dateQuery.split("&")[0].slice(0, 4))
      : parseInt(dateQuery.slice(0, 4));
    const firstDateMonth = isRange
      ? parseInt(dateQuery.split("&")[0].slice(4, 6))
      : parseInt(dateQuery.slice(4, 6));
    const firstDateDay = isRange
      ? parseInt(dateQuery.split("&")[0].slice(6))
      : parseInt(dateQuery.slice(6));

    const secondDateYear = isRange
      ? parseInt(dateQuery.split("&")[1].slice(0, 4))
      : null;
    const secondDateMonth = isRange
      ? parseInt(dateQuery.split("&")[1].slice(4, 6))
      : null;
    const secondDateDay = isRange
      ? parseInt(dateQuery.split("&")[1].slice(6))
      : null;

    const firstDate = new Date(
      Date.UTC(firstDateYear, firstDateMonth - 1, firstDateDay)
    );
    const secondDate = isRange
      ? new Date(Date.UTC(secondDateYear, secondDateMonth - 1, secondDateDay))
      : null;

    const transactions_date = isRange
      ? transactions.filter(
          (transaction) =>
            new Date(transaction.trans_date) >= firstDate &&
            new Date(transaction.trans_date) <= secondDate
        )
      : transactions.filter(
          (transaction) =>
            new Date(transaction.trans_date).getTime() === firstDate.getTime()
        );

    return transactions_date;
  }
);

export const selectTransactionsByPayee = createSelector(
  [transactions, (state, payeeQuery) => payeeQuery],
  (transactions, payeeQuery) => {
    return transactions.filter(
      (transaction) => transaction.trans_payee === payeeQuery
    );
  }
);

export const selectTransactionsByAmount = createSelector(
  [transactions, (state, amountQuery) => amountQuery],
  (transactions, amountQuery) => {
    return transactions.filter(
      (transaction) => transaction.trans_amount === +amountQuery
    );
  }
);

export const selectUniquePayees = createSelector(
  [transactions],
  (transactions) => {
    const uniques = new Set();
    transactions.forEach((transaction) => uniques.add(transaction.trans_payee));
    return [...uniques];
  }
);
