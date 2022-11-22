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

