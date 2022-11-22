const update_accounts = 'accounts/update_accounts';
const add_accounts = 'accounts/add_accounts';
const delete_accounts = 'accounts/delete_accounts';
const load_accounts = 'accounts/load_accounts';


const update = ( accounts ) => ( { // update accounts in the store
	return { type: update_accounts, accounts };

};

const add = ( accounts ) => ( { // add accounts to the store
	return { type: add_accounts, accounts };

};

const delete = ( accounts ) => ( { // delete accounts from the store
	return { type: delete_accounts, accounts };

};

const load = ( accounts ) => ( { // load accounts from the store
	return { type: load_accounts, accounts };

};

export const getAccounts = () => async ( dispatch ) => { // get accounts from the server
	const response = await fetch( '/api/accounts/' );

	if ( response.ok ) {
		const accounts = await response.json();
		dispatch( load( accounts.all_accounts ) );
		return accounts;
	}