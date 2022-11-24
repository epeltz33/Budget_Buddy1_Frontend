const add_transaction = 'transactions/add_transaction'; // action type
const delete_transaction = 'transactions/delete_transaction';
const update_transaction = 'transactions/update_transaction';
const load_transactions = 'transactions/load_transactions';
const delete_account = 'transactions/delete_account'; //

const add = ( newTransaction ) => {
	return { type: add_transaction, newTransaction };
};

const remove = ( transactionId ) => {
	return { type: delete_transaction, transactionId };
}

const update = ( transaction ) => {
	return { type: update_transaction, transaction };
}

const load = ( transactions ) => {
	return { type: load_transactions, transactions };
}

export const getTransactions = () => async ( dispatch ) => {
	const response = await fetch('/api/transactions');

	if (response.ok) {
		const transactions = await response.json
		dispatch(load(transactions.all_transactions));
		return transactions;
	}
};

export const createTransaction = ( newTransaction ) => async ( dispatch ) => {
	const response = await fetch('/api/transactions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newTransaction), 
	});

	if (response.ok) {
		const transaction = await response.json(); // { transaction: { id: 1, ... } }  // this is the transaction object that was created
		dispatch(add(transaction));
		return transaction;
	}
}

export const deleteTransaction = ( transactionId ) => async ( dispatch ) => {
	const response = await fetch(`/api/transactions/${transactionId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(remove(transactionId));
		return response;
	}
}

export const updateTransaction = ( transaction ) => async ( dispatch ) => {
	const response = await fetch(`/api/transactions/${data.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(transaction),
	});

	if (response.ok) {
		dispatch(update(transaction));
		return transaction; // this is the transaction object that was updated
	}
}

const initialState = {}; // this is an object with transaction ids as keys and transaction objects as values

const transactionReducer = ( state = initialState, action ) => {
	let newState;
	switch (action.type) {
		case add_transaction:
			newState = { ...state };
			newState[action.newTransaction.id] = action.newTransaction;
			return newState;
		case delete_transaction:
			newState = { ...state };
			delete newState[action.transactionId];
			return newState;
		case update_transaction:
			newState = { ...state };
			newState[action.transaction.id] = action.transaction;
			return newState;
		case load_transactions:
			newState = { ...state };
			action.transactions.forEach(transaction => {
				newState[transaction.id] = transaction;
			});
			return newState;
		case delete_account:
			newState = { ...state };
			for (let transactionId in newState) {
				if (newState[transactionId].accountId === action.accountId) {
					delete newState[transactionId];
				}
			}
			return newState;
		default:
			return state;
	};
};

export default transactionReducer;
