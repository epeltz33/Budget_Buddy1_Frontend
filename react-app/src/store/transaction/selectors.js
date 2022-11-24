import { createSelector } from 'reselect';
const transactions = ( state ) => state.transaction.all;

export const selectTransactionsByAccount = createSelector(
	[transactions, (state, accountId) => accountId],
	(transactions, accountId) => transactions.filter((transaction) => transaction.accountId === +accountId)

);

export const selectTransactionsByDate = createSelector(
	[transactions, (state, dateQuery) => dateQuery],
	(transactions, dateQuery) => {
		const isRange = dateQuery.indexOf('&') > -1; // check if dateQuery is a range of dates

		const firstDateMonth = (isRange) ? parseInt(dateQuery.split('&')[0].splice(4, 6)) : parseInt(dateQuery.splice(4, 6)); // get month from dateQuery
		const firstDateYear = (isRange) ? parseInt(dateQuery.split('&')[0].splice(0, 4)) : parseInt(dateQuery.splice(0, 4)); // get year from dateQuery
		const firstDateDay = (isRange) ? parseInt(dateQuery.split('&')[0].splice(6)) : parseInt(dateQuery.splice(6)); // get day from dateQuery

		const secondDateMonth = (isRange) ? parseInt(dateQuery.split('&')[1].splice(4, 6)) : null;
		const secondDateYear = (isRange) ? parseInt(dateQuery.split('&')[1].splice(0, 4)) : null;
		const secondDateDay = (isRange) ? parseInt(dateQuery.split('&')[1].splice(6)) : null;

		const firstDate = new Date(Date.UTC(firstDateYear, firstDateMonth-1, firstDateDay)); // create date object from dateQuery
		const secondDate = (isRange) ? new Date(Date.UTC(secondDateYear, secondDateMonth-1, secondDateDay)) : null;

		const transaction_date = (isRange) ? transactions.filter((transaction) => new Date(transaction.date) >= firstDate && new Date(transaction.date) <= secondDate) :
		transactions.filter((transaction) => new Date(transaction.date).getMonth() === firstDate.getMonth() && new Date(transaction.date).getFullYear() === firstDate.getFullYear());

		return transaction_date;
	}
);

export const selectTransactionsByCategory = createSelector(
	[transactions, (state, categoryId) => categoryId],
	(transactions, categoryId) => transactions.filter((transaction) => transaction.categoryId === +categoryId)
);


export const selectTransactionsByRecipient = createSelector(
	[transactions, (state, recipientId) => recipientId],
	(transactions, recipientId) => transactions.filter((transaction) => transaction.recipientId === +recipientId)
);

export const selectTransactionByAmount = createSelector(
	[transactions, (state, amountQuery) => amountQuery], (transactions, amountQuery) => {
	return transactions.filter((transaction) => transaction.amount === +amountQuery)
});



