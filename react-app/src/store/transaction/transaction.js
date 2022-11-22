const add_transaction = 'transactions/add_transaction'; // action type
const delete_transaction = 'transactions/delete_transaction';
const update_transaction = 'transactions/update_transaction';
const load_transactions = 'transactions/load_transactions';
const delete_account = 'transactions/delete_account'; //

const add = ( newTransaction ) => {
	return { type: add_transaction, newTransaction };
};

const delete = ( prevTransaction ) => {
	return { type: delete_transaction, prevTransaction };
};

const update = ( transaction ) => {
	return { type: update_transaction, transaction };
};

const load = (transactions) => {
    return { type: load_transactions, transactions };
};

export const getTransactions = () => async ( dispatch ) => {
	const response = await fetch( '/api/transactions' );

	if ( response.ok ) {
		const transactions = await response.json();
		dispatch( load( transactions.all_transactions ) );
		return transactions;
	}
}
export const createTransactions = ( newTransaction ) => async ( dispatch ) => {
	const response = await fetch( '/api/transactions', {
		method: 'POST',
		body: JSON.stringify( newTransaction ),
		headers: {
			'Content-Type': 'application/json'
		});
	if ( response.ok ) {
		const transactions = await response.json();
        dispatch( load( transactions.all_transactions ) );
		return transactions;
	};
	else {
        console.log( response );
};
	return null; // if the response was not ok
};



