import { createSelector } from 'reselect';



const transactions = ( state ) => state.transaction.all;

export const getTransactionsByAccount = createSelector(
	[transactions( state, accountId )=> accountId],
	( transactions, accountId ) => {
		return transactions.filter( ( transaction ) => transaction.accountId === +accountId ); // + converts string to number
	}
);

export const getTransactionsByCategory = createSelector(
	[transactions( state, categoryId )=> categoryId],
    ( transactions, categoryId ) => {
        return transactions.filter( ( transaction ) => transaction.categoryId === +categoryId );
    }
);

export const getTransactionsByDate = ( [transactions, ( state, dateQuery ) => dateQuery],
	( transactions, dateQuery ) => {
		const isInRange = dateQuery.indexOf( "&" ) !== -1; // the "&" is used to indicate a range of dates so !== -1 means that it is in the string of the ranges
		const firstDateYear = ( isInRange ) ? parseInt( dateQuery.split( "&" )[0].slice( 0, 4 ) ) : parseInt( dateQuery.slice( 0, 4 ) ); // the slice (0, 4) is used to get the year from the date string (YYYY-MM-DD)
		const firstDateMonth = ( isInRange ) ? parseInt( dateQuery.split( "&" )[0].slice( 4, 6 ) ) : parseInt( dateQuery.slice( 4, 6 ) ); // the slice (4, 6) is used to get the month from the date string (YYYY-MM-DD) so 4 is the start and 6 is the end (so it doesn't include the day)
		const firstDateDay = ( isInRange ) ? parseInt( dateQuery.split( "&" )[0].slice( 6, 8 ) ) : parseInt( dateQuery.slice( 6, 8 ) ); // the slice (6, 8) is used to get the day from the date string (YYYY-MM-DD) so 6 is the day of the month and 8 is the day of the month + 1 (so it doesn't include the day)

		const secondDateYear = ( isInRange ) ? parseInt( dateQuery.split( "&" )[1].slice( 0, 4 ) ) : null // convert the string to a number and get the year from the date string (YYYY-MM-DD), null means that it is not in the range
		const secondDateMonth = ( isInRange ) ? parseInt( dateQuery.split( "&" )[1].slice( 4, 6 ) ) : null
		const secondDateDay = ( isInRange ) ? parseInt( dateQuery.split( "&" )[1].slice( 6, 8 ) ) : null

		const firstDate = new Date( Date.UTC( firstDateYear, firstDateMonth - 1, firstDateDay ) ); // the month is -1 because the months are 0 indexed
		const secondDate = ( isInRange ) ? new Date( Date.UTC( secondDateYear, secondDateMonth - 1, secondDateDay ) ) : null;

		const transactions_data = ( isInRange ) ?
			transactions.filter( transaction => ( new Date( trans_date ) >= firstDate && new Date( transaction.trans_date ) <= secondDate ) ) : // if it is in the range, then filter the transactions by the date range (>= and <=)
			transactions.filter( transaction => ( new Date( transaction.trans_date ).getTime() === firstDate.getTime() ) ); // if it is not in the range, then filter the transactions by
		return transactions_data;
	}
);

export const getTransactionByAmount = createSelector(
	[transactions, ( state, amountQuery ) => amountQuery],
	( transactions, amountQuery ) => {
		return transactions.find( transaction => transaction.trans_amount === +amountQuery );
	} );

/* TODO:
1. make function for transaction by payee\
export const getTransactionByPayee = createSelector(

*/




