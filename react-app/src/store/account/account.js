
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
	switch (action.type) {
		case add_accounts:
			newState = Object.assign({}, state);
			newState.byId[action.newAccount.id] = action.newAccount;
			newState.all.push(action.newAccount.id);
			return newState;
		case update_accounts:
			newState = Object.assign({}, state);
			newState.byId[action.account.id] = action.account;
			return newState;
		case delete_accounts:
			newState = Object.assign({}, state);
			delete newState.byId[action.accountId];
			newState.all = newState.all.filter(id => id !== action.accountId);
			return newState;
		case load_accounts:
			newState = Object.assign({}, state);
			action.accounts.forEach(account => {
				newState.byId[account.id] = account;
				newState.all.push(account.id);
			});
			return newState;
		default:
			return state;
	};
}

export default accountReducer;