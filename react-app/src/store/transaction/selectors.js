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


