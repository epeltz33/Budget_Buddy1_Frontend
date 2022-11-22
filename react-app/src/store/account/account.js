const update_accounts = 'accounts/update_accounts';
const add_accounts = 'accounts/add_accounts';
const delete_accounts = 'accounts/delete_accounts';
const load_accounts = 'accounts/load_accounts';


const update = ( account ) => ( { // update accounts in the store
	return { type: update_accounts, accounts };

};

const add = ( newAccounts ) => ( { // add accounts to the store
	return { type: add_accounts, accounts };

};

const delete = ( prevAccounts ) => ( { // delete accounts from the store
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

	export const createAccount = ( account ) => async ( dispatch ) => { // create account on the server and add to the store if successful
		const response = await fetch( '/api/accounts/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( newAccount ),
		} );
		const account= await response.json();
		if ( response.ok ) {
			dispatch( add( data.account ) ); //  add account to the store
			return account;
		}
	};

	export const updateAccount = ( data ) => async ( dispatch ) => { // update account on the server and update the store
		const response = await fetch( `/api/accounts/${ data.id }/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( account ),
		} );
		const account = await response.json();
		if ( response.ok ) {
			dispatch( update( data.account ) ); // update account in the store
			return account;
		}
	};

	export const deleteAccount = ( data ) => async ( dispatch ) => { // delete account on the server and delete from the store
		const response = await fetch( `/api/accounts/${ prevAccount.id }`, {
			method: 'DELETE',
		} );

		if ( response.ok ) {
			const account = await response.json(); // delete account from the store
			dispatch( delete ( data.account ) );
			return account;

		}
	};


	const initialState = { byId: {}, allIds: [] };

	const accountReducer = ( state = initialState, action ) => {

		switch ( action.type ) {
			case update_accounts: {
				const { accounts } = action;
				const newById = { ...state.byId };
				const newAllIds = [ ...state.allIds ];
				accounts.forEach( ( account ) => {
					newById[account.id] = account;

					if ( !newAllIds.includes( account.id ) ) {
						newAllIds.push( account.id );
					}

				} );

				return { byId: newById, allIds: newAllIds };

			}

			case add_accounts: {
				const { accounts } = action;
				const newById = { ...state.byId };
				const newAllIds = [ ...state.allIds ];
				accounts.forEach( ( account ) => {
					newById[account.id] = account;

					if ( !newAllIds.includes( account.id ) ) {
						newAllIds.push( account.id );
					}

				} );

				return { byId: newById, allIds: newAllIds };

			}

			case delete_accounts: {
				const { accounts } = action;
				const newById = { ...state.byId };
				const newAllIds = [ ...state.allIds ];
				accounts.forEach( ( account ) => {
					delete newById[account.id];
					newAllIds = newAllIds.filter( ( id ) => id !== account.id );

				} );

				return { byId: newById, allIds: newAllIds };

			}

			case load_accounts: {
				const { accounts } = action;
				const newById = {};
				const newAllIds = [];
				accounts.forEach( ( account ) => {
					newById[account.id]
					newAllIds.push( account.id );

				} );

				return { byId: newById, allIds: newAllIds };

			}

			default:
				return state;
		};

	};

	export default accountReducer; // export the reducer to the store index.js