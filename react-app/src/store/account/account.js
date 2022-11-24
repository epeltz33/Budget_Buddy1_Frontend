
const update_accounts = 'accounts/update_accounts';
const add_accounts = 'accounts/add_accounts';
const delete_accounts = 'accounts/delete_accounts';
const load_accounts = 'accounts/load_accounts';


const add = (newAccount) => {
	return {type: add_accounts, newAccount };
};

const update = (account) => {
	return {type: update_accounts, account };
};

const remove = (accountId) => {
	return {type: delete_accounts, accountId };
};

const load = (accounts) => {
	return {type: load_accounts, accounts };
};

export const addAccounts = () => async (dispatch) => {
	const response = await fetch('/api/accounts/');

	if (response.ok) {
		const accounts = await response.json();
		dispatch(load(accounts.all_accounts));
		return accounts;
	};
};

export const createAccount = (newAccount) => async (dispatch) => {
	const response = await fetch('/api/accounts/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newAccount)
	});

	if (response.ok) {
		const account = await response.json();
		dispatch(add(account));
		return account;
	};
}

export const updateAccount = (account) => async (dispatch) => {
	const response = await fetch(`/api/accounts/${account.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(account)
	});

	if (response.ok) {
		const account = await response.json();
		dispatch(update(account));
		return account;
	};
}

export const deleteAccount = (accountId) => async (dispatch) => {
	const response = await fetch(`/api/accounts/${accountId}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		dispatch(remove(accountId));
		return accountId;
	};
}


const initialState = {byId: {}, all: []};

const accountReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) { //action.type is the action that is being dispatched from the action creator
		case add_accounts:
			newState = Object.assign({}, state); // create a copy of the state   
			newState.byId[action.newAccount.id] = action.newAccount; // add the new account to the byId object 
			newState.all.push(action.newAccount.id); // add the new account id to the all array
			return newState; // return the new state 
		case update_accounts:  
			newState = Object.assign({}, state); // create a copy of the state object and update the account with the new account
			newState.byId[action.account.id] = action.account; // 
			return newState; // 
		case delete_accounts:
			newState = Object.assign({}, state); // create a copy of the state 
			delete newState.byId[action.accountId]; // delete the account from the byId object
			newState.all = newState.all.filter(id => id !== action.accountId); // remove the account id from the all array
			return newState;
		case load_accounts:
			newState = Object.assign({}, state); 
			action.accounts.forEach(account => { // loop through the accounts array
				newState.byId[account.id] = account; // add each account to the byId object
				newState.all.push(account.id); // add each account id to the all array
			});
			return newState;
		default:
			return state; // return the state if no action is dispatched
	};
}

export default accountReducer; // export the reducer so it can be used in the store