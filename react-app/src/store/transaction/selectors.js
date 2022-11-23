import { createSelector } from 'reselect';
const transactions = ( state ) => state.transaction.all;

export const selectTransactionsByAccount = createSelector(
	[transactions, (state, accountId) => accountId],
	(transactions, accountId) => transactions.filter((transaction) => transaction.accountId === +accountId)
);
