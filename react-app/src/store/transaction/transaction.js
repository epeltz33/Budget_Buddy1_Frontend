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


export const updateTransaction = ( data ) => async ( dispatch ) => {
	const response = await fetch( `/api/transactions/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify( data ),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if ( response.ok ) {
		const transaction = await response.json();
		dispatch( update( transaction ) ); // update the transaction with the updated transaction data
		return transaction;
	};
}

export const deleteTransaction = ( prevTransaction ) => async ( dispatch ) => {
	const response = await fetch( `/api/transactions/${prevTransaction.id}`, {
		method: 'DELETE',
	});

	if ( response.ok ) {
		const transaction = await response.json();
		dispatch( remove( transaction ) );

		);
	};
	return null; // if the response was not ok
};



const initialState = { byId: {},  all: []};

const transactionReducer = ( state = initialState, action ) => {

	switch ( action.type ) {
		case add_transactions: {
			const newState = {
				...state,
				byId: {},
				all: []
			};

			for ( let i = 0; i < action.transactions.length; i++ ) {
				let transaction = action.transactions[i];
				newState.byId[transaction.id] = transaction;
				newState.transactions.all.push( transaction ); // push the transaction to the array of transactions
			};
			return newState;
		};
		case delete_transaction: {
			const deleteId = action.prevTransaction.id;
			const newState = {
				...state,
				byId: { ...state.byId }, // copy the byId object from the state
				all: state.all.filter( ( transaction ) => transaction.id !== deleteId ) // filter out the transaction with the id of the deleted transaction
			};
			delete newState.byId[action.prevTransaction.id]
			return newState;
		};

		case update_transaction: {
			const editTransaction = action.transaction; // get the transaction from the action
			const updateId = editTransaction.id;
			const newState = {
				...state,
				byId: { ...state.byId },
				[updateId]: editTransaction
			},
				all: state.all.map( ( transaction ) =>
					transaction.id === updateId ? editTransaction : transaction )
		};
			return newState;
		};
        case load_transactions: {
            const newState = {
				...state,
				byId: {},
				all: []
			};
			for ( let i = 0; i < action.transactions.length; i++ ) {
				let transaction = action.transactions[i];
				newState.byId[transaction.id] = transaction;
				newState.transactions.all.push( transaction );
			}
			return newState;
	};
Object.values( newState.byId ).forEach( ( transaction ) =>
	transaction.accountId === deletedId ? delete newState.byId[transaction.id] : null ) // delete the transaction from the byId object if the transaction's accountId is the same as the deleted account's id
	);
	return newState;
  };
  default:
	return state;
 };

};

export default transactionReducer;
